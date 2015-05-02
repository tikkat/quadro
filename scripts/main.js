function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("task", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  var angularScope = angular.element($("body")).scope();
  console.log(angularScope);
  var data = ev.dataTransfer.getData("task");

  if(ev.target.className.indexOf('task-element') > -1) {
    console.log(ev.target.dataset.quadrant);
  } else {
    switch (ev.target.id) {
      case 'first':
        console.log("1");
        break;
      case 'second':
        console.log("2");
        break;
      case 'third':
        console.log("3");
        break;
      case 'fourth':
        console.log("4");
        break;
      default:
        return;
    }
  }

  ev.target.appendChild(document.getElementById(data));
}
