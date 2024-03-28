let connection = new JsStore.Connection(new Worker('scripts/jsstore.worker.js'))

// Register sqlweb
connection.addPlugin(SqlWeb.default);
window.onload = function () {
  initiateDb()
  getRecord()

  const recordId     = getQsValueByName("id")
  const upsertButton = document.querySelector("#upsert")
  if (recordId) {
    document.title                           = "ブログ更新"
    document.querySelector("h1").textContent = "ブログ更新"
    upsertButton.textContent                 = "更新する"
  } else {
    document.title                           = "ブログ追加"
    document.querySelector("h1").textContent = "ブログ追加"
    upsertButton.textContent                 = "追加する"
  }
  upsertButton.addEventListener("click", upsert, false)
}

function initiateDb() {
  let dbName = "records";
  connection.$sql.run('ISDBEXIST ' + dbName).then(function (isExist) {
    if (isExist) {
      connection.$sql.run('OPENDB ' + dbName);
    } else {
      window.location.href = "index.html";
    }
  }).catch(function (err) {
    console.log(err);
    alert(err.message);
  });
}

// DBから取得した値をフォームにセットする
function getRecord() {
  recordId = getQsValueByName("id")

  //check if Query string param exist
  if (recordId) {
    let query = new connection.$sql.Query("select * from record where id='@id'")
    query.map('@id', Number(recordId))
    connection.$sql.run(query).then(function (results) {
      if (results.length > 0) {
        let record = results[0]
        document.querySelector("[name ='title']").value     = record.title
        document.querySelector("[name ='date']").value      = record.date
        document.querySelector("[name ='hiduke']").value    = record.hiduke
        document.querySelector("[name ='image']").value     = record.image
        document.querySelector("[name ='paragraph']").value = record.paragraph
      } else {
        alert('Invalid record id')
      }
    }).catch(function (err) {
      console.log(err)
      alert(err.message)
    })
  }
}

function upsert() {
  // if record exist means we have to update data
  if (recordId) {
    updateRecord()
  } else {
    insertRecord()
  }
}

function hiduke() {
  let h = document.querySelector("[name ='hiduke']").value
  if (h !== "") { return h }
  let y, m, d
  [y, m, d] = document.querySelector("[name ='date']").value.split("-")
  const num2kan = ["〇", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二", "十三", "十四", "十五", "十六", "十七", "十八", "十九", "二十", "二十一", "二十二", "二十三", "二十四", "二十五", "二十六", "二十七", "二十八", "二十九", "三十", "三十一"]
  y = num2kan[Number(y)-2018]
  m = num2kan[Number(m)]
  d = num2kan[Number(d)]
  return `令和${y}年${m}月${d}日`
}

function updateRecord() {
  let query = new connection.$sql.Query("update record set title='@title', date='@date', hiduke='@hiduke', image='@image', paragraph='@paragraph' where id='@id'")
  query.map("@title",     document.querySelector("[name ='title']").value)
  query.map("@date",      document.querySelector("[name ='date']").value)
  query.map("@hiduke",    hiduke())
  query.map("@image",     document.querySelector("[name ='image']").value)
  query.map("@paragraph", document.querySelector("[name ='paragraph']").value)
  query.map("@id",        Number(recordId))

  connection.$sql.run(query).then(function (rowAffected) {
    alert(`${rowAffected} 件、更新しました。`)
    if (rowAffected > 0) {
      window.location.href = "editor.html"
    }
  }).catch(function (err) {
    console.log(err)
    alert(err.message)
  })
}

function insertRecord() {
  let value = {
    title:     document.querySelector("[name ='title']").value,
    date:      document.querySelector("[name ='date']").value,
    hiduke:    hiduke(),
    image:     document.querySelector("[name ='image']").value,
    paragraph: document.querySelector("[name ='paragraph']").value
  }

  let query = new connection.$sql.Query("insert into record values ({title: '@title', date: '@date', hiduke: '@hiduke', image: '@image', paragraph:  '@paragraph'})")
  query.map("@title",     document.querySelector("[name ='title']").value)
  query.map("@date",      document.querySelector("[name ='date']").value)
  query.map("@hiduke",    hiduke())
  query.map("@image",     document.querySelector("[name ='image']").value)
  query.map("@paragraph", document.querySelector("[name ='paragraph']").value)

  connection.$sql.run(query).then(function (rowInserted) {
    alert(`${rowInserted} 件、追加しました。`)
    window.location.href = "editor.html"
  }).catch(function (err) {
    console.log(err)
    alert(err.message)
  })
}

function getQsValueByName(name, url) {
  if (!url) {
    url = window.location.href
  }
  name = name.replace(/[\[\]]/g, "\\$&")
  let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url)
  if (!results) return null
  if (!results[2]) return ''
  return decodeURIComponent(results[2].replace(/\+/g, " "))
}
