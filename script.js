function init()
{
  var timer=document.getElementById("displaytimer");
  var modal=document.getElementById("modal");
  var headeroverlay=document.getElementById("headeroverlay")
  const quotesdisplay=document.getElementById("quotesdisplay");
  const quoteswrite=document.getElementById("quoteswrite");
  var scorecount=0;
  headeroverlay.onclick=function()
  {
    const quoteswrite=document.getElementById("quoteswrite");
    modal.style.display="none";
    quotesdisplay.innerHTML=""
    quoteswrite.value=""
    timerun();
    renderNewQuote();
    scorecount=0;
    var lslen=localStorage.length;
    var scorehis=document.getElementById("scorehistory");
    var gamenumber=document.getElementById("gamenumber");
    gamenumber.innerHTML="Game No#: "+lslen;
    scorehis.innerHTML="";
for(var i=0;i<lslen;i++)
{
  var namee=localStorage.key(i);
   var newele=document.createElement('h3');
   newele.style.backgroundColor="rgba(0,0,0,0.5)";
   newele.style.color="white"
   newele.style.padding="6px";
   newele.style.borderRadius="10px"
   newele.innerHTML=namee+" : "+localStorage.getItem(namee);
   scorehis.appendChild(newele)
}
  }
function timerun()
{
  var lslen=window.localStorage.length;
  timer.innerHTML=0;
   var id=setInterval(frame,1000)
   function frame()
   {
        timer.innerHTML++;
        if(timer.innerHTML==60)
        {
          clearInterval(id);
          modal.style.display="block";
          headeroverlay.innerHTML="your score is "+scorecount+"<br>"+"click to start again";
          headeroverlay.style.textAlign="center"
          window.localStorage.setItem(`match#${lslen}`,scorecount)
        }
   }
}
  quoteswrite.addEventListener('keyup', ()=>{
    var qd=quotesdisplay.querySelectorAll('span');
    var qw=quoteswrite.value.split('');
    let correct=true;
    qd.forEach((characterspan,index)=>
    {
        var char=qw[index];
        if(char==null)
        {
          characterspan.classList.remove("correct");
          characterspan.classList.remove("incorrect");
          correct=false;
        }
       else if(char==characterspan.innerText)
        {
            characterspan.classList.add("correct");
            characterspan.classList.remove("incorrect")
        }
        else
        {
          characterspan.classList.add("incorrect")
          correct=false;
        }
    })
    if(correct)
    {
        scorecount++;
        quotesdisplay.innerHTML=""
        quoteswrite.value=""
       renderNewQuote();
    }
  })
  function getRandomQuote() {
      return fetch('https://api.quotable.io/random')
        .then(response => response.json())
        .then(data => data.content)
    }
       async function renderNewQuote() {
      const quote = await getRandomQuote()
      console.log(quote)
       quote.split('').forEach(character => {
          const quotesdisplay=document.getElementById("quotesdisplay");
        const characterSpan = document.createElement('span')
        characterSpan.innerText = character;
        quotesdisplay.appendChild(characterSpan);
      })
    }
}
window.onload=init;

  
  



