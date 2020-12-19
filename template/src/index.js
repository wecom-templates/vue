import App from './Component.Vue';

function setup (window){
  window.component = App
}

setup(window)

// TODO: 可以将其改为注册全局组件的方式使用