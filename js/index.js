//找人
// var box = document.getElementById("box");
// var ul = box.children[0];
var lis = ul.children;

//循环遍历 lis 绑定背景图

for (var i = 0; i < lis.length; i++) {
  lis[i].style.backgroundImage = "url(./img/" + (i + 1) + ".webp)";

  //给每一个li注册鼠标经过事件 鼠标经过后要排他

  lis[i].onmouseover = function () {
    //干掉所有人 让所有人的宽度 渐渐地 变为100

    for (var j = 0; j < lis.length; j++) {
      animate(lis[j], { width: 100 });
    }

    //留下我自己 让我的宽度 渐渐地 变为800

    animate(this, { width: 800 });
  };
}

//鼠标离开box 所有的li宽度 渐渐地 变为240

ul.onmouseout = function () {
  for (var i = 0; i < lis.length; i++) {
    animate(lis[i], { width: 240 });
  }
};

//jQuery中有animate动画函数，下面是实现的原理，虽然没有jQ的强大，但是基本的效果实现还是没有问题的

function animate(obj, json) {
  clearInterval(obj.timer);
  obj.timer = setInterval(function () {
    //先假设 这一次执行完 所有的属性都到达目标了

    var flag = true;
    for (var k in json) {
      var leader = parseInt(getStyle(obj, k)) || 0;
      var target = json[k];
      var step = (target - leader) / 10;
      step = step > 0 ? Math.ceil(step) : Math.floor(step);
      leader = leader + step;
      obj.style[k] = leader + "px";
      //if (leader === target) {
      // clearInterval(obj.timer);
      //}
      console.log("代码还在运行");
      if (leader != target) {
        flag = false; //告诉标记 当前这个属性还没到达
      }
    }

    //如果此时仍然为true 就说明真的都到达了

    if (flag) {
      clearInterval(obj.timer);
    }
  }, 15);
}

//全部属性都到达目标值才能清空

function getStyle(obj, attr) {
  if (window.getComputedStyle) {
    return window.getComputedStyle(obj, null)[attr];
  } else {
    return obj.currentStyle[attr];
  }
}
