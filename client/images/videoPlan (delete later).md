# Prog Gold Summative Assignment 2 Video Plan

## Video
---
1. Start with **npm start** in VS Code, and then in chrome open the link [http://127.0.0.1:8080](http://127.0.0.1:8080) to open the website.
2. Show that website is responsive by first changing the screen width.
3. Then show how website looks on phone (show that text boxes can be scrolled through for the front of the flashcard).
4. Prove use of Dynamic AJAX loading and that the website is single page asynchronous
5. Demonstrate that the navbar can be used to go through different parts of the website.
6. Show that subjects can be selected, to show different flashcards, use the right and left arrows to show how it loops back around (show shadows).
7. Show how to flip flashcards to check the other side of the flashcard.
8. Click see reviews to show the reviews of a flashcard (pick a flashcard with many reviews), and show how this varies per flashcard. Show how it says currenty no reviews if no reviews.
9. Show how a review can be made, maybe either cut or speed up me typing in the form. Show how the average updates and the reviews shown update (remember to hover over ratings from right to left). Review to make, 
>`{ 
> &emsp; "reviewer_name": Charles
> &emsp; "review_title": Well Done Flashcard
> &emsp; "comment": Overall I really enjoyed this flashcard, nothing more to say
> &emsp; "rating": 5/5
>}` 
10. Click on Make a flashcard on navbar and show how a flashcard can be made, again either speedup or cut typing. Show how the flashcard updates by scrolling up, make the flashcard have a new subject and show how the subjects update as well, and then select it with subject.
>`{ 
> &emsp; "front": In which organelle within a plant cell does photosynthesis occur?
> &emsp; "back": In chloroplasts, which contain chlorophyll.
> &emsp; "subject": Biology
>}`  
11. Click select flashcard, first show how they can be sorted by various attributes e.g. Date of creation, subject. Then use the search, and show how it is not case sensitive. Then select a flashcard.
12. Edit the entries of the flashcard and submit, then show how these changes are updated - change sinx to sinx + c and change cosx to cosxdx. 

## Audio
---
1. First talk about how to start it - type npm install and then npm start in terminal and go to any browser and put link [http://127.0.0.1:8080](http://127.0.0.1:8080) for URL.
2. Say that website is responsive as bootstrap was used for most things
3. Talk about how text areas are used for flashcards text so that there is no limit on their size as you can just scroll down if there is too much text.
4. Talk about how asynchronous functions used for all GET requests and POST requests hence the website can run while it is interacting with the server.
5. Use of bootstrap navbar to make all the parts of the website easily accessible
6. Subjects can be selected using dropdown, the option "Please select subject" displays all flashcards when selected, it is also selected by default.
7. Each time an arrow button is clicked, the asynchronous function for the GET request is called but with a different parameter so as to display a different set of flashcards. Made so that it loops back. Flashcards show empty if there is space for more flashcards but there are no more to show.
8. Flashcards can be flipped by clicking on the text "flip flashcard", this does not call a GET request as both the front and the back of the flashcard are loaded at the same time.
9. Each flashcards has its own set of reviews (One-to-many relationship). Calls a GET request which gets all the reviews of the flashcards. The average rating over all the flashcards is also shown alongside all the different reviews.
10. By scrolling down a section to post your own review appears. The rating is inputted by selecting one of the 5 stars shown. When hovering over these stars, a tooltip appears showing the corresponding word used for that rating (e.g. 1/5 is terrible).
11. Flashcards can also be uploaded by inputting the front, back and subject of the flashcard and then submit by either pressing enter or clicking the make flashcard button. Whenever a new flashcard is uploaded, the GET request for GET all flashcards is called and hence is updated automatically without having to refresh anything.
12. Finally, flashcards can be editted, first click the button "click to select a flashcard", this opens up a modal where all flashcards are shown. If there are too many flashcard, you can sort by date, subject, front and back (alphabetical). Also, you can search by the front of the flashcard, note that as is shown, this is not case sensitive. 
13. After clicking a flashcard, the current front, back and subject of the flashcard will show in the form, after making some edits, simply click submit edits to upload these edits. Once again, this will call the get flashcards GET request again, hence no refreshing needed to see your changes.