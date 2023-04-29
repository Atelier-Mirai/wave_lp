/* 暦 & 簡易ブログ のための JavaScript
 * https://www.cssscript.com/basic-calendar-view/ を参考に実装
-------------------------------------------------------------------------*/

// ブログデータを取得
const BLOGS = {
  "R05-04-01": "本日四月一日より令和五年度の始まり、近くの公園の桜も咲いています。",
  "R05-04-03": "仕事始めです",
  "R05-04-07": "週末はゆっくりします",
  "R05-04-19": "公園でお散歩しました",
  "R05-04-20": "今日も公園でお散歩しました",
  "R05-04-29": "昭和の日です",
  "R05-05-05": "こどもの日のお祝いです",
  "R05-05-07": "連休も今日で最後です",
  "R05-06-01": "今日から六月です",
  "R05-06-10": "時の記念日です"
}

// 祝日データ
// Holidays JP API より 祝日データを取得し 貼り付ける
// https://holidays-jp.github.io/api/v1/date.json
const HOLIDAYS = {"2022-01-01": "元日", "2022-01-10": "成人の日", "2022-02-11": "建国記念の日", "2022-02-23": "天皇誕生日", "2022-03-21": "春分の日", "2022-04-29": "昭和の日", "2022-05-03": "憲法記念日", "2022-05-04": "みどりの日", "2022-05-05": "こどもの日", "2022-07-18": "海の日", "2022-08-11": "山の日", "2022-09-19": "敬老の日", "2022-09-23": "秋分の日", "2022-10-10": "スポーツの日", "2022-11-03": "文化の日", "2022-11-23": "勤労感謝の日", "2023-01-01": "元日", "2023-01-02": "休日 元日", "2023-01-09": "成人の日", "2023-02-11": "建国記念の日", "2023-02-23": "天皇誕生日", "2023-03-21": "春分の日", "2023-04-29": "昭和の日", "2023-05-03": "憲法記念日", "2023-05-04": "みどりの日", "2023-05-05": "こどもの日", "2023-07-17": "海の日", "2023-08-11": "山の日", "2023-09-18": "敬老の日", "2023-09-23": "秋分の日", "2023-10-09": "スポーツの日", "2023-11-03": "文化の日", "2023-11-23": "勤労感謝の日", "2024-01-01": "元日", "2024-01-08": "成人の日", "2024-02-11": "建国記念の日", "2024-02-12": "建国記念の日 振替休日", "2024-02-23": "天皇誕生日", "2024-03-20": "春分の日", "2024-04-29": "昭和の日", "2024-05-03": "憲法記念日", "2024-05-04": "みどりの日", "2024-05-05": "こどもの日", "2024-05-06": "こどもの日 振替休日", "2024-07-15": "海の日", "2024-08-11": "山の日", "2024-08-12": "休日 山の日", "2024-09-16": "敬老の日", "2024-09-22": "秋分の日", "2024-09-23": "秋分の日 振替休日", "2024-10-14": "スポーツの日", "2024-11-03": "文化の日", "2024-11-04": "文化の日 振替休日", "2024-11-23": "勤労感謝の日"}

// ブログに日付の記載があれば、それを、無ければ今日を、当日の日付とする
// <time datetime="2023-04-01">四月一日</time>
let today = document.querySelector("time")
let t
if (today && (t = today.getAttribute("datetime"))) {
  let s = Date.parse(t)
  today = new Date(s)
} else {
  today = new Date()
}
// 年と月も設定
let currentYear  = today.getFullYear()
let currentMonth = today.getMonth() + 1

// 定数宣言
const thisYear   = currentYear
const thisMonth  = currentMonth
const thisDay    = today.getDate()
const MONTHS      = ["", "睦月", "如月", "彌生", "卯月", "皐月", "水無月", "文月", "葉月", "長月", "神無月", "霜月", "師走"]
const WDAYS       = ["日", "月", "火", "水", "木", "金", "土"]
const NAME_OF_DAY = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]
const NUM_TO_KAN  = ["〇", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十"]

// <title>タグに<h1>タグの文字を設定する
const h1 = document.querySelector("h1")
const h1Text = h1.innerText
const title = document.querySelector("title")
title.innerHTML = `${h1Text} - WAVE`

// 暦の背景写真と暦本体の為の要素定義 & 生成
const wallpaper = document.getElementById("wallpaper")
wallpaper.setAttribute("data-month", currentMonth)
const calendar  = document.getElementById("calendar")

// 月ごとの暦の写真の為の要素生成
const photograph = document.createElement("div")
photograph.className = "photograph"
photograph.setAttribute("data-month", currentMonth)
calendar.appendChild(photograph)

// 前月翌月の操作盤の為の要素生成
const panel = document.createElement("div")
panel.className = "panel"
  // 前月
  const a_prev = document.createElement("a")
  a_prev.className = "prev"
  a_prev.setAttribute("title", "前月")
  a_prev.innerHTML = `<i class="fa-solid fa-angle-left"></i>`
  a_prev.addEventListener("click", previousMonth, false)
  // 翌月
  const a_next = document.createElement("a")
  a_next.className = "next"
  a_next.setAttribute("title", "翌月")
  a_next.innerHTML = `<i class="fa-solid fa-angle-right"></i>`
  a_next.addEventListener("click", nextMonth, false)
  // 年表示
  const span_year = document.createElement("span")
  span_year.className = "year"
  span_year.setAttribute("data-year", currentYear)
  span_year.innerHTML = `令和 ${NUM_TO_KAN[currentYear-2018]} 年`
  // 月表示
  const span_month = document.createElement("span")
  span_month.className = "month"
  span_month.setAttribute("data-month", currentMonth)
  span_month.innerHTML = MONTHS[currentMonth]
panel.appendChild(a_prev)
panel.appendChild(a_next)
panel.appendChild(span_year)
panel.appendChild(span_month)
calendar.appendChild(panel)

// 暦本体の為の要素生成
const table = document.createElement("table")
const thead = document.createElement("thead")
let tr = document.createElement("tr")
for (wday in WDAYS) {
  th   = document.createElement("th")
  text = document.createTextNode(`${WDAYS[wday]}`)
  th.appendChild(text)
  tr.appendChild(th)
}
thead.appendChild(tr)
table.appendChild(thead)
calendar.appendChild(table)

// 今月投稿したブログの一覧の為の要素生成
const blogHeader = document.createElement("p")
blogHeader.className = "blog header"
blogHeader.innerHTML = "今月の投稿"
calendar.appendChild(blogHeader)
const nav = document.createElement("nav")
let ul = document.createElement("ul")
ul.id = "ul"
nav.appendChild(ul)
calendar.appendChild(nav)

// 当月の暦生成&表示
showCalendar(currentYear, currentMonth)

// 前月操作時の各種更新
function previousMonth() {
  currentYear  = (currentMonth === 1) ? currentYear - 1 : currentYear
  currentMonth = (currentMonth === 1) ? 12 : currentMonth - 1
  document.querySelector("#calendar .year").setAttribute("data-year", currentYear)
  document.querySelector("#calendar .year").innerText = `令和 ${NUM_TO_KAN[currentYear-2018]} 年`
  document.querySelector("#calendar .month").setAttribute("data-month", currentMonth)
  document.querySelector("#calendar .month").innerText = MONTHS[currentMonth]
  document.getElementById("wallpaper").setAttribute("data-month", currentMonth)
  document.querySelector("#calendar .photograph").setAttribute("data-month", currentMonth)
  // カレンダー生成&表示
  showCalendar(currentYear, currentMonth)
}

// 翌月操作時の各種更新
function nextMonth() {
  currentYear  = (currentMonth === 12) ? currentYear + 1 : currentYear
  currentMonth = (currentMonth === 12) ? 1 : currentMonth + 1
  document.querySelector("#calendar .year").setAttribute("data-year", currentYear)
  document.querySelector("#calendar .year").innerText = `令和 ${NUM_TO_KAN[currentYear-2018]} 年`
  document.querySelector("#calendar .month").setAttribute("data-month", currentMonth)
  document.querySelector("#calendar .month").innerText = MONTHS[currentMonth]
  document.getElementById("wallpaper").setAttribute("data-month", currentMonth)
  document.querySelector("#calendar .photograph").setAttribute("data-month", currentMonth)
  // カレンダー生成&表示
  showCalendar(currentYear, currentMonth)
}

// 当月の暦生成&表示
function showCalendar(year, month) {
  let firstDay = zeller(year, month, 1)

  // 以前の暦を削除 ＆ 今月の暦新規作成
  tbody     = document.getElementById("tbody")
  if (tbody !== null) { tbody.remove() }
  tbody     = document.createElement("tbody")
  tbody.id  = "tbody"

  // 以前のブログ一覧を削除 ＆ 今月のブログ一覧新規作成
  ul     = document.getElementById("ul")
  if (ul !== null) { ul.remove() }
  ul     = document.createElement("ul")
  ul.id  = "ul"
  nav.appendChild(ul)

  // 月初の空日処理
  let wday = 0
  let tr = document.createElement("tr")

  // 月が始まるまでの空日処理
  for (let date = 1 - firstDay; date < 1; date++, wday++) {
    td     = document.createElement("td")
    tr.appendChild(td)
  }

  // 一日から末日までの処理
  for (date = 1; date <= daysInMonth(year, month); date++) {
    td = document.createElement("td")
    td.className = NAME_OF_DAY[wday]
    a  = document.createElement("a")
    a.setAttribute("href", "#")
    a.innerHTML = date

    // 今日なら today クラス付与
    if (date === thisDay && currentMonth === thisMonth && currentYear === thisYear) {
      td.className = "today"
    }

    // 祝日なら holiday クラス付与 & title属性付与
    let name
    if (name = holidayName(currentYear, currentMonth, date)) {
      td.className = "holiday"
      td.setAttribute("title", name)
    }

    // ブログ執筆日なら blogday クラス付与 & title属性付与
    let blog_no_title
    if (blog_no_title = blogTitle(currentYear, currentMonth, date)) {
      // blog クラス付与
      td.className = `${td.className} blogday`

      // title 属性 追記
      if (td.getAttribute("title")) {
        td.setAttribute("title", `${td.getAttribute("title")} ${blog_no_title}`)
      } else {
        td.setAttribute("title", blog_no_title)
      }
      // リンク属性設定
      let link = `${stringifyDate(currentYear, currentMonth, date)}.html`
      a.setAttribute("href", link)

      // ブログ一覧へのリンク生成
      let li = document.createElement("li")
      blog_a  = document.createElement("a")
      blog_a.setAttribute("href", link)
      blog_a.innerHTML = blog_no_title
      li.appendChild(blog_a)
      ul.appendChild(li)
    }

    td.appendChild(a)
    tr.appendChild(td)

    // 週末(土曜日)まで処理したら 翌週の行を生成 */
    if (wday === 6) {
      tbody.appendChild(tr)
      tr = document.createElement("tr")
      wday = 0
    } else {
      wday++
    }
  }
  tbody.appendChild(tr)
  table.appendChild(tbody)
}

// その月の日数を返す
function daysInMonth(year, month) {
  if (leapYear()) {
    // 閏年
    //   1   2   3   4   5   6   7   8   9  10  11  12月
    return [0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month]
  } else {
    // 平年
    return [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month]
  }
}

// 閏年判定
function leapYear(year) {
  return (year % 4 === 0) && (year % 100 !== 0) || (year % 400 === 0)
}

// ツェラーの公式
// https://ja.wikipedia.org/wiki/ツェラーの公式
function zeller(year, month, day) {
  if (month === 1 || month === 2) {
    month += 12
    year  -= 1
  }

  let d     = day
  let m     = month
  let C     = Math.floor(year/100)
  let Y     = year % 100
  let gamma = -2*C + Math.floor(C/4)

  let h     = (d + Math.floor(26*(m+1)/10) + Y + Math.floor(Y/4) + gamma) % 7
  let wday  = (h + 6) % 7
  // 曜日 日  月  火  水  木  金  土
  // h    1   2   3   4   5   6   0
  // wday 0   1   2   3   4   5   6

  return wday
}

// 祝日名を返す
function holidayName(year, month, day) {
  // 日付文字列へ変換
  let yyyy          = `${year}`
  let mm            = month.toString().padStart(2, '0')
  let dd            = day.toString().padStart(2, '0')
  let stringifyDate = `${yyyy}-${mm}-${dd}`

  return  HOLIDAYS[stringifyDate]
}

// 日付文字列へ変換
function stringifyDate(year, month, day) {
  let reiwa         = (year-2018).toString().padStart(2, '0')
  let mm            = month.toString().padStart(2, '0')
  let dd            = day.toString().padStart(2, '0')
  return `R${reiwa}-${mm}-${dd}`
}

// ブログ表題を返す
function blogTitle(year, month, day) {
  return  BLOGS[stringifyDate(year, month, day)]
}
