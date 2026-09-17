# hiddenText

> The purpose of the program is to add hidden text to fool AI crawling or copy paste action by adding poison text. The suppose AI will take both the legit text and poison text into either its training or prompt.

## KeyTerms
Poison text: Acts as an poison to prompt or training to cause it to misunderstand the overall information.
Main text: It is the text that you created and wish to be protected from these actions.
Replace text: Written in json/ object format to indicate the text to be replaced when being copy. 

## About
To combat web crawling by AI and copy pasting to AI prompt action, I have developed this program to add poison text to add confusion. This can be use to protect work of text from being taken as training data.
The idea is inspired by Jason Gibson history professor at Alcorn State University in Mississippi adding white text into the test. The difference of this program is the text will be overlapped potentially making it harder to spot. 
Instead of adding white text on some empty line, this program will put the poison text directly behind the legit text making it more difficult to spot during copy and pasting. By making the background color the same as the poison text, one can only see the legit text.
Note: For the copy and paste prevention work one will need the algorithm to generate the overlapping implement in the display. This is just a showcase.
To use it immediately, one can choose to download the png image of the generated text and publish the image instead. When the suppose AI try to read the text from the image, it will either be unreadable or the overlapping cause it to read the poison text.

## How to use
Type the text you want to be protected onto the main text field and the poison text onto the poison fields.
Choose the text size for the protected text and the text size for the poison. For deterring copy paste, having smaller poison text is ideal. When it comes to text recognition for a png image, poison text being to small might have a reverse affect of it not being read.
Choose the color for both texts. By making the background the same as poison color with only reveal the legit text.
You can switch the top text for being poison but its effects will not be ideal.
Preview only allows you to view the copy paste preventive sample text.
If preview only is uncheck a png image will be downloaded containing both texts.
To change copy paste behavior, add a replace rule to replace certain group text.


### used:
javascript
html
css
https://gist.github.com/incubated-geek-cc/23b1e04b4592215d3f288d373ecda1a8 for downloading png image.

### usage
You should be able to try it on a website.

### Author
me
