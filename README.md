# NC News App

The NC News App is a front-end application for users to interact with the Northcoders News API via a user-friendly UI, built using the [Material UI](https://mui.com/) framework.

## Link to deployed version

---

https://nc-news-site-kc.netlify.app/

## Features

---

The NC News App offers users the following features and functionality:

### Articles

- Home page displays article cards containing the title, topic, author, date, number of comments, and number of likes.
- When article cards are selected, users will be redirected to the article page, displaying the article body, and a list of comments
- Topics page displays article cards filtered by topic of interest.
- Users can sort articles based on the following criteria:
  - date
  - comment count
  - votes
  - order (ascending or descending)
- The list of articles displayed is initially limited to 10 - this can be increased by selecting the 'Load More Articles' button at the bottom of the page.
- Users can post articles by selecting the Post Article link in the nav bar.
  - Posted article topic will need to match existing topics.
  - Once an article has been successfully posted, the user will be redirected to the Article page.
- Users are able to delete articles associated with their own username (a bin icon will be displayed)

### Comments

- Comments are displayed in the related article's page.
- Users are able to post comments in a text box below the article.
- Users are able to delete comments associated with their own username (a bin icon will be displayed)
- The list of comments is initially limited to 10, but can be increased by clicking the 'Load More Comments' button at the bottom of the page.

### Likes

- Likes are displayed for each article and comment.
- Users are able to increase or decrease the like count by 1.

## Link to repository

---

https://github.com/kam-cheng/nc-news.git

## Installation Instructions

---

Minimum version of Node supported - v16.14.0

Clone the repository by inputting the following in your command line terminal

```
git clone https://github.com/kam-cheng/Northcoders-News-API.git
```

Change to the repository directory.

```
cd nc-news
```

Install all package dependencies.

```
npm install
```

Launch the app in your browser.

```
npm start
```

## Link to back-end API repository

---

https://github.com/kam-cheng/Northcoders-News-API.git
