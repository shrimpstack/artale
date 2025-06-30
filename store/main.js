let 說明data = {};
window.addEventListener("load", async () => {
  let 說明res = await post("取物品說明", body = {});
  說明data = 說明res.data;

  let 倉庫res = await post("取倉庫有多少", body = {});
  顯示items(倉庫res.data, 卷軸列表);

  let 存放res = await post("取大家存多少", body = {});
  顯示items(存放res.data.filter(({who}) => who == "阿村"), 阿村存放);
  顯示items(存放res.data.filter(({who}) => who == "花果山"), 花果山存放);
  顯示items(存放res.data.filter(({who}) => who == "夏目雪"), 夏目雪存放);
  顯示items(存放res.data.filter(({who}) => who == "卡皮"), 卡皮存放);
});

function 顯示items(items, 目標el) {
  目標el.innerHTML = "";
  items.forEach(item => {
    let item_el = 目標el.querySelector(`[name="${item.name}"]`);
    if(item_el) {
      let count_el = item_el.querySelector(".count");
      count_el.innerText = +count_el.innerText + +item.count;
      if(+count_el.innerText == 0) item_el.remove();
    }
    else {
      item_el = create_item_el(item, 說明data[item.name]);
      目標el.append(item_el);
    }
  });
}

function create_icon(icon_name, subicon) {
  let icon = document.createElement("span");
  icon.classList.add("icon");
  icon.style.setProperty("--icon", `url(./img/one/${icon_name}.png)`);
  icon.setAttribute("itype", subicon);
  return icon;
}

function create_item_el(item, 說明) {
  let item_el = document.createElement("div");
  item_el.classList.add("item");
  item_el.setAttribute("name", item.name);

  let icon = create_icon(說明.icon, 說明.subicon);

  let count_span = document.createElement("span");
  count_span.classList.add("count");
  count_span.innerText = item.count;

  let name_el = document.createElement("div");
  name_el.classList.add("name");
  name_el.innerText = item.name;

  let cnt_el = document.createElement("div");
  cnt_el.classList.add("cnt");
  cnt_el.innerText = 說明.cnt;

  item_el.append(icon, count_span, name_el, cnt_el);
  return item_el;
}

function post(action, data) {
  if(!window.XMLHttpRequest) {
    alert('無法連線，請更換瀏覽器');
    return;
  }
  data.action = action || "";
  let url = "https://script.google.com/macros/s/AKfycbwwia9030oksLYYQvA4NgwqRk1Mfwe3yPdGMTfA2ETvpS05ZxlmHSqtCScgI8tcdp3E/exec";
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.responseType = "json";
    xhr.addEventListener("load", () => {
      if(xhr.status == 200) {
        resolve(xhr.response);
      }
      else {
        reject(xhr.status);
      }
    });
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    let content = JSON.stringify(data);
    xhr.send("content=" + encodeURI(content));
  });
}