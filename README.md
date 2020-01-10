# Technologies
React, Redux, Redux-Saga, Rails API, MongoDB, Rspec, Front-Back end structure.
You can use the folder(client) be run in a separate server. We shouldn't use MVC of Ruby on Rails framework.

## On Heroku
[Demo](https://glacial-garden-45040.herokuapp.com/)

Our app is to have three models: users, organisations, and shifts. Your database should closely resemble the following [entity-relationship diagram](https://en.wikipedia.org/wiki/Entity%E2%80%93relationship_model#Crow's_foot_notation):

Figure 1:

![](https://i.imgur.com/w1YzNY6.png)

## How your app should work

The following illustrations should only serve as an example. we do not need to follow the designs presented below. we can split functionality out to other pages. Just make sure it is all there.

An unauthenticated user should first be prompted to log in, sign up, or reset their password:

Figure 2:

![](https://i.imgur.com/XLhRtL3.png)

As per Figure 1, users have names, so "Name" should be a field on your sign up page.

Figure 3:

![](https://i.imgur.com/yflhRac.png)

After signing up, users will not belong to an organisation, so when they log in for the first time, they should be prompted to join an organisation (or create a new one).

Figure 4:

![](https://i.imgur.com/V53XD3X.png)

Users should be able to edit all organisations (i.e. their names and their hourly rates).

Figure 5:

![](https://i.imgur.com/XMoFEzj.png)

Once a user has joined an organisation, the home page should change to become an overview of actions for that organisation: viewing shifts, editing the organisation, or leaving the organisation.

Figure 6:

![](https://i.imgur.com/7tZ9Gfc.png)

Leaving an organisation should return the user to the state they are in just after they sign up, i.e. not belonging to any organisations.

Finally, the shift page should show all shifts that belong to the user and their fellow employees at their organisation.

Figure 7:

![](https://i.imgur.com/3XS2mvP.png)

A few things to note:
* The hourly rate at Bob's Burgers in Figure 7 is $10/h.
* Your table should include all the columns in Figure 7, and should be ordered with the most recent shifts listed first.
* Breaks are considered unpaid and are thus subtracted from `shift length` to determine `hours worked` (which in turn determines `shift cost`):
  ```
  shift length = finish time – start time
  hours worked = shift length - break length in hours
  shift cost = hours worked * organisation hourly rate
  ```
  `shift length` doesn't need to be displayed in the table, but `hours worked` and `shift cost` do.
* You will need to incorporate a way of creating a new shift for the user that is logged in. As with everything else, you don't need to copy the way it was done in the screenshot above.
* As per Figure 1, shift date and start time are to be stored in the same database column. Separating the two (and joining them together when you create a shift) is an exercise left to the reader.

### Optional exercises
Here are some optional exercises for you to do. We recommend that you try at least one of them. They are all mutually compatible, so you could do all of them. Some will require changes to the structure of the database.



#### 1. Modifying/Deleting shifts (easy)
Allow users to modify or delete existing shifts.

#### 2. Overnight shifts (medium)
When creating a shift, if the finish time of a shift is earlier than the start time, the shift should be considered overnight. For example, if the start time is 7:30pm and the finish time is 1:30am, then it is an overnight shift that goes for 6 hours.

#### 3. Penalty rates on Sundays (medium)
The hourly rate should be doubled for shifts worked on a Sunday. If you do exercise (4) then you will need to account for overnight shifts in the following manner: The 2x should only apply to the hours worked on Sunday. For the sake of simplicity, subtract the break length from the end of the shift. For example:

| start | finish | break length | shift cost (assuming $10 hourly rate) |
| - | - | - | - |
| 10pm Sunday | 3am Monday | 1 hour | $60 (5h at work – 1h break = 2h worked on Sunday and 2h worked on Monday) |
| 5pm Sunday | 2am Monday | 2 hours | $140 (9h at work – 2h break = 7h worked on Sunday) |
| 9pm Sunday | 1am Monday | 2 hours | $40 (4h at work – 2h break = 2h worked on Sunday) |


#### 4. Unit tests
Unit tests are a good idea. We don't mandate that you write any for this challenge, but feel free to go ahead and write some tests for your code.

#### 5. JavaScript enhancements
It is possible to build a solution to this challenge without writing a line of JS. However, a solution that used some would be more exciting. Here are some ideas:
* A datepicker for the shift date field
* Using Ajax to create shifts
* Sorting by column


#### 6. Your own idea

You will be judged on the the appropriate use of database constraints, your choice of data types, working data validation, the general quality of your Ruby code, and how closely your solution matches this spec. Be a show off! Impress us with your strong command of relational databases and idiomatic Ruby on Rails.


