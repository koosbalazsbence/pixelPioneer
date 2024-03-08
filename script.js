function hamburgerIcon(x) {
    x.classList.toggle("change")
    const navbarList = document.querySelector('.navbar-list')
    navbarList.classList.toggle('show')
}

let TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate
    this.el = el
    this.loopNum = 0
    this.period = parseInt(period, 10) || 2000
    this.txt = ''
    this.tick()
    this.isDeleting = false
}

TxtType.prototype.tick = function() {
    let i = this.loopNum % this.toRotate.length
    let fullTxt = this.toRotate[i]
    this.isDeleting ? this.txt = fullTxt.substring(0, this.txt.length - 1) : this.txt = fullTxt.substring(0, this.txt.length + 1)
    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>'

    let that = this
    let delta = 200 - Math.random() * 100
    if (this.isDeleting) delta /= 2
    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period
        this.isDeleting = true
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false
        this.loopNum++
        delta = 500
    }
    setTimeout(function() {
        that.tick()
    }, delta)
}

window.onload = function() {
    let elements = document.getElementsByClassName('typewrite')
    for (let i=0; i<elements.length; i++) {
        let toRotate = elements[i].getAttribute('data-type')
        let period = elements[i].getAttribute('data-period')
        if (toRotate) new TxtType(elements[i], JSON.parse(toRotate), period)
    }
    let css = document.createElement("style")
    css.type = "text/css"
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #737373}"
    document.body.appendChild(css)
}

let mybutton = document.getElementById("myBtn")
window.onscroll = function() {scrollFunction()}

function scrollFunction() {
  document.body.scrollTop > 20 || document.documentElement.scrollTop > 20 ? mybutton.style.display = "block" : mybutton.style.display = "none"
}
function topFunction() {
  document.body.scrollTop = 0
  document.documentElement.scrollTop = 0
}