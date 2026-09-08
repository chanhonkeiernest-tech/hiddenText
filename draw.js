// The browser provides Image and canvas APIs directly.
//const fs = require('fs');
//const path = require('path');

let overColor = '#ff0000';
let outColorTop = '#050505';
let outColorBottom = '#ffffff';

let outColor = outColorBottom;

function mouseOver() {
  document.getElementById("resultArea").style.backgroundColor = overColor;
}

function mouseOut() {
  document.getElementById("resultArea").style.backgroundColor = outColor;
}
window.mouseOver = mouseOver;
window.mouseOut = mouseOut;



async function drawAndSave(front, back, main, poision, frontColor, backColor) {
    // 1. Load the background image from a local path or URL
    // For this example, ensure 'input.jpg' exists in your directory
    //const imagePath = path.join(__dirname, 'sketch1788568637022.png'); 
    const offsetBack = front>back ? (front-back)/2 : 0;
    const offsetFront = front<back ? (front-back)/2 : 0;
    const imagePath = 'sketch1788568637022.png'; 
    const img = await new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = () => resolve(image);
        image.onerror = () => reject(new Error('Unable to load the background image.'));
        image.src = imagePath;
    });

    // 2. Create an isolated canvas instance matching the image dimensions
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth || img.width;
    canvas.height = img.naturalHeight || img.height;
    const ctx = canvas.getContext('2d');

    // 3. Draw the background image onto the canvas
    ctx.drawImage(img, 0, 0, img.width, img.height);

    

    // Draw each wrapped line separately so paragraphs stay inside the image.
    ctx.fillStyle = backColor;
    ctx.font = back+'px Arial';
    ctx.textBaseline = 'top';

    const margin = 200;
    const maxWidth = canvas.width - margin * 2;
    const lineHeight = 50;
    let y = 100+offsetBack;

    for (const paragraph of poision.split('\n')) {
        if (paragraph.trim() === '') {
            y += lineHeight;
            continue;
        }

        let line = '';
        for (const word of paragraph.split(/\s+/)) {
            const candidate = line ? `${line} ${word}` : word;
            if (ctx.measureText(candidate).width > maxWidth && line) {
                ctx.fillText(line, margin, y);
                y += lineHeight;
                line = word;
            } else {
                line = candidate;
            }
        }

        if (line) {
            ctx.fillText(line, margin, y);
            y += lineHeight;
        }
    }



    ctx.fillStyle = frontColor;
    ctx.font = front+'px Arial';
    ctx.textBaseline = 'top';
    const maxWidth2 = canvas.width - margin * 2;
    const lineHeight2 = 50;
    y = 100+offsetFront;

    for (const paragraph of main.split('\n')) {
        if (paragraph.trim() === '') {
            y += lineHeight2;
            continue;
        }

        let line = '';
        for (const word of paragraph.split(/\s+/)) {
            let candidate;
            if(line){
                candidate = line +" "+ word;
            }else{
                candidate = word;
            }
            
            if (ctx.measureText(candidate).width > maxWidth2 && line) {
                ctx.fillText(line, margin, y);
                y += lineHeight2;
                line = word;
            } else {
                line = candidate;
            }
        }

        if (line) {
            ctx.fillText(line, margin, y);
            y += lineHeight;
        }
    }




    // 5. Convert canvas to a Buffer and save to disk
    // const buffer = canvas.toBuffer('image/png');
    // fs.writeFileSync(path.join(__dirname, 'output.png'), buffer);
    
    // console.log('Image saved successfully as output.png');

    //https://gist.github.com/incubated-geek-cc/23b1e04b4592215d3f288d373ecda1a8
    let imageDataURL=await Promise.resolve(canvas.toDataURL());
    let dwnlnk = document.createElement('a');
    dwnlnk.download = 'output.png';
    dwnlnk.href = imageDataURL;
    
    dwnlnk.click();

}

const text = `Technology has become essential to our everyday life. As a person who sees its impact and the security issues within, it motivates me to work in Fujitsu to better protect such essential technology. Fujitsu's role in keeping the world connected also resonates with my vision of technology being a great tool for human connection. My knowledge in computer networks, IT support, software project development, program testing, resolving bugs and cyber security allows me to handle most IT-related issues and resolve them in a timely manner. Combined with my strong analytical thinking skills, I hope to serve as a great asset as a Desktop Engineer.

With my experience in testing systems for university project assignments, I developed a strong understanding of software systems and developed secure software. During a school project, the team had to create a chat web application for counseling mental health. Since it involved sensitive information about a person, security was a top priority. To ensure it, we conducted a penetration test to look for potential vulnerabilities such as SQL injection. We also set up preventive measures to deter potential abuse by replacing specific characters. With all that, we prevented unauthorized extraction of confidential information and deterred most malicious action.

As a graduate, I am still eager to contribute and learn more about the ever-changing technology environment. My technology skills, critical thinking, and motivation to learn will be a great asset in supporting your company's day-to-day operations. I look forward to meeting with you for further discussion on how I will be able to contribute to the team. I am grateful for the opportunity and the time you provided to review my application.

Yours sincerely,

Ernest Chan`;

const text2 = `Collaborated with Sales and Product Development teams on research and design of new lighting products to meet market demand.
Conducted quality control and product testing, maintaining high satisfaction rates and minimizing defects.
Assisted in  resolving network and software related issue 
Maintained overall infrastructure for day to day operation and developed needed technology tools
Provided technical assistance on Windows-based systems, business systems and networking issues within the company.
Manage technology related asset and record tools condition.
`;


const replacement = "";

// drawAndSave(34,12, text2, text,'#000000' , '#ff0000').catch((error) => {

    
//     console.error('Unable to create output.png:', error);
//     process.exitCode = 1;
// });


const textForm = document.getElementById("textToBeGenerated");

textForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const main = document.getElementById("mainText").value.trim();
  const poision = document.getElementById("poisionText").value.trim();
  const mainSize = document.getElementById("mainTextSize").value;
  const poisionSize = document.getElementById("poisionTextSize").value;
  const mainColor = document.getElementById("mainTextColor").value;
  const poisionColor = document.getElementById("poisionTextColor").value;
  const switching = document.getElementById("switch").checked;
  const sampling = document.getElementById("sampling").checked;
//   let offsetBottom = mainSize>poisionSize ? (mainSize)/16 : 0;
//   let  offsetTop = mainSize<poisionSize ? (poisionSize)/16 : 0;
  let offsetTop = 0;
  let offsetBottom = 0;
  if( mainColor!== poisionColor){
    if(mainSize===poisionSize){
        document.getElementById("text-behind").style.lineHeight = 1;
        document.getElementById("text-front").style.lineHeight = 1;
    }else if(mainSize>poisionSize){
        document.getElementById("text-behind").style.lineHeight = mainSize/poisionSize;
        document.getElementById("text-front").style.lineHeight = 1;
    }else{
        document.getElementById("text-behind").style.lineHeight = 1;
        document.getElementById("text-front").style.lineHeight = poisionSize/mainSize;
    }
    const display = document.getElementById("resultArea");
    console.log(offsetTop);
    console.log(offsetBottom);
    document.getElementById("text-behind").style.fontSize=poisionSize + "px";
    document.getElementById("text-behind").style.top=offsetBottom + "rem";
    document.getElementById("text-behind").style.color=poisionColor;
    document.getElementById("text-behind").innerHTML=poision;
    document.getElementById("text-front").style.fontSize=mainSize + "px";
    document.getElementById("text-front").style.top=offsetTop + "rem";
    document.getElementById("text-front").style.color=mainColor;
    document.getElementById("text-front").innerHTML=main;

    //document.getElementById("resultArea").style.color=poisionColor;

    if(poisionColor===overColor||mainColor===overColor){
        overColor='#00ccff';
    }
    if(poisionColor===overColor||mainColor===overColor){
        overColor='#ff0000';
    }
    if(poisionColor===overColor||mainColor===overColor){
        overColor='#bbff00';
    }
    outColorTop=mainColor;
    outColorBottom=poisionColor;
    if(switching){
        outColor=outColorTop;
    

    }else{
        outColor=outColorBottom;
    }
    document.getElementById("resultArea").style.backgroundColor=outColor;

    //display.innerHTML=`<p class="text-behind" style="font-size:`+ poisionSize+`; top: `+poisionSize+`;">`+posion +`</p> <p class="text-front"  style="font-size:`+ mainSize+`;">` +main+`</p>`;
        try {
            if(!sampling)await drawAndSave(mainSize, poisionSize, main, poision, mainColor, poisionColor);
        } catch (error) {
            console.error('Unable to create output.png:', error);
        }
  }else{
    const output = `<p> Creation fail! The posion text has to be shorter or same length as the main text. Posion text size has to be either smaller or same size as main</p>`
    const display = document.getElementById("resultArea");
    display.innerHTML=output;
  }

  
});

