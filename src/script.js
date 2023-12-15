function printCharacters(word){
    let output = document.getElementById("bio-text");
    
    // split every character into an array
    let characters = word.split('');

    // looping through the word
    characters.forEach(function(char, index) {
        // delay
       setTimeout(function (){
        // add each letter with a delay on each
            output.innerHTML += char;
       }, 100 * index);
    });
}

function deleteCharacters(){
    let output = document.getElementById("bio-text");
    let text = output.innerHTML;

    // reverse loop and remove character by replacing the tag with a substring
    for(let i = text.length;i >= 0;i--){
        setTimeout(function(){
            output.innerHTML = text.substring(0, i);
        }, 100 * (text.length - i));
    }
}

function printOutMessage(){
    // array to hold all the titles
    const bioTexts = ["Computer Scientist", "2nd Year Student", "Programmer", "Software Developer"];
    let index = 0;

    function printNext() {
        printCharacters(bioTexts[index]);
    
        // Increment index or reset to 0 if it reaches the end of the array
        index = (index + 1) % bioTexts.length;
    
        // Call the function again after a delay 1000 milliseconds
        setTimeout(deleteCharacters, 4000);
        setTimeout(printNext, 6000);
    }

    // start loop
    printNext();
}

printOutMessage();

function imageHovering(){
    let hoverImage = document.querySelector('.shoes-img');
    let secondImage = document.querySelector('.car-img');

    hoverImage.addEventListener('mouseover', function(){
        secondImage.style.opacity = '0.5';
    })

    hoverImage.addEventListener('mouseout', function() {
        // Revert the opacity when not hovering
        secondImage.style.opacity = '1';
    });
}

imageHovering();