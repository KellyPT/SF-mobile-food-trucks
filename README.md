# San Francisco Mobile Food Trucks

### How to install dependencies and build this program
1. Fork and clone this repo on your computer
2. In your terminal, cd into the local repo.
3. Run `$npm install`
4. Your terminal should inform you about successful installation of 5 packages: `request`, `url`, `columnify`, `moment` and `moment-timezone`.

### How to run this program
1. In your terminal, run `$node FoodTruckFinder.js`
2. If you wish to see the results at page p (p is a positive number), run `$node FoodTruckFinder.js <p>`. Each page shows 10 results. In any case where the argument p is missing, or not a number, or a non-positive number, the page is defaulted to 1.

### What would I do differently if I were asked to build this as a full-scale web application
1. I would retrieve App Token from the San Francisco API website [here](https://dev.socrata.com/docs/app-tokens.html) and incorporate the token into my web app. Because this web app would potentially be used by a large number of users, using an app token would prevent throttling limits.

2. I would enable other types of filters to enhance user experience. For example:
    - A user could input his/her current location and search results based on preferred distance between a food truck and his/her location (e.g. 1 miles, 5 miles etc.).
    - A user could search results based on his/her choice of date and time. This is useful if the user wants to plan a lunch appointment with someone else.
    - A user could search results based on food trucks' names. This is useful if the user wants to know the schedule of his/her favorite food trucks. In addition, I noticed that the dataset shows multiple locations at the same date time for certain food trucks. This might be because a particular company has multiple trucks running at the same time at different locations. If this is true, I would build an interactive map showing the locations of all food trucks of the same name.
    - A user could choose to the number of results per page on his/her view (e.g. 20/page, 50/page)
