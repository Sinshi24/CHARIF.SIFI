const c=document.getElementById('matrix'), ctx=c.getContext('2d');
let cw,ch,cols,rows,stack=[];
function resize(){
  cw=c.width=innerWidth;
  ch=c.height=innerHeight;
  cols=Math.floor(cw/14);
  rows=Math.floor(ch/14);
  stack=[];
  for(let i=0;i<cols;i++) stack[i]=Math.random()*-rows;
}
resize();
addEventListener('resize',resize);
function draw(){
  ctx.fillStyle='rgba(0,0,0,.05)';
  ctx.fillRect(0,0,cw,ch);
  ctx.fillStyle='#00ff00';
  ctx.font='14px Share Tech Mono';
  for(let i=0;i<cols;i++){
    const t='01アイウエオカキクケコサシスセソタチツテトナニヌネノ'.charAt(Math.floor(Math.random()*34));
    ctx.fillText(t,i*14,stack[i]*14);
    if(stack[i]*14>ch&&Math.random()>.975) stack[i]=0;
    stack[i]++;
  }
}
setInterval(draw,35);

/* ---------- terminal ---------- */
const out=document.getElementById('term-out');
const inp=document.getElementById('cmd');
const files={
  'about.txt':'Embedded systems engineer specialising in hardware design and firmware development.\nSpecialities: ARM Cortex-M, PCB Design, IoT Solutions, RTOS',
  'skills.txt':'Embedded C | C++ | Python | PCB Design | ARM Cortex-M | RTOS | Verilog | IoT',
  'repo.txt':'https://github.com/charifsifi',
  'linkedin.txt':'https://linkedin.com/in/charifsifi',
  'email.txt':'charif@example.com',
  'resume.pdf':'https://charifsifi.dev/resume.pdf'
};
function println(s){out.innerHTML+=s+'\n';out.scrollTop=out.scrollHeight;}
inp.addEventListener('keydown',e=>{
  if(e.key==='Enter'){
    const cmd=inp.value.trim();
    inp.value='';
    if(cmd) println('> '+cmd);
    const args=cmd.split(/\s+/);
    switch(args[0]){
      case'help':println('commands: help ls cat <file> clear repo linkedin email');break;
      case'ls':println(Object.keys(files).join('   '));break;
      case'cat':args[1]&&files[args[1]]?println(files[args[1]]):println('file not found');break;
      case'clear':out.innerHTML='';break;
      case'repo':window.open('https://github.com/charifsifi','_blank');println('Opening GitHub…');break;
      case'linkedin':window.open('https://linkedin.com/in/charifsifi','_blank');println('Opening LinkedIn…');break;
      case'email':location.href='mailto:charif@example.com';println('Opening email…');break;
      default:if(cmd){println(`command not found: ${cmd}`);println('   try "help"');}break;
    }
  }
});

/* ---------- scroll-spy (120 px offset) ---------- */
const sections=document.querySelectorAll('section');
const navLinks=document.querySelectorAll('nav a');
function onScroll(){
  let current='';
  sections.forEach(sec=>{
    const top=window.scrollY;
    const offset=sec.offsetTop-120;
    const height=sec.offsetHeight;
    if(top>=offset&&top<offset+height)current=sec.getAttribute('id');
  });
  navLinks.forEach(link=>{
    link.classList.remove('active');
    if(link.getAttribute('href')==='#'+current)link.classList.add('active');
  });
}
window.addEventListener('scroll',onScroll);onScroll();