
# AppleSeeds Mid - Project - Handy Dandy

Essentially, this project serves as a versatile platform, which furnishes users with information on a variety of DIY projects around the house. Moreover, it also equips them with the requisite tools and materials necessary for completing each specific project, whilst providing detailed information about every tool or material in the "TOOL-O-PEDIA".


## Demo

https://handy-dandy.netlify.app/


## Features

- Self built "Wiki" providing information about construction tools and materials
- Admin panel providing dynamic management of the database (adding tools , materials and articles)
- User personal Toolbox , for keeping track of their tools.
- Article contains tools , and materials needed props and are communicating with the users toolbox.



## Dependencies

`@reduxjs/toolkit` `axios` `dotenv` `firebase` `react-redux` `react-router-dom`

## Project Development Roadmap

### Getting familiar with never used before technologies

- Firebase
- MUI
- Redux
- Redux-Toolkit


### Functionality:

- Basic structure of the application (Folders,Utilities,Pages)
- Setting up Firebase configuration
- Basic user authentication and routing
- A more complex authentication verification and adding extra information to firestore on user signup.
- Wrapping application with an Auth provider component.
- Admin panel with basic tool adding Functionality.
- Basic "wiki" to display data added from Admin panel.
- Diving deeper in the "wiki" data displaying until specific Tool/Material with routing params
- User toolbox
- Making Toolmanager generic to manage materials as well.
- Adding an Article manager.


### Design:

- Laying out base components from MUI
- Making a global theme , and designing specific components.
- Final styling

### Performance:
- Seperating !DRY functions to global Utilities.
- Dividing global pattern's to global components (AutoComplete input / ImageUpload component )



### Documentation:

- Add readme to the repository


## Lessons Learned

- Reading and using DB data across the whole application and generating new data depending on existing data.

- Managing a global state wisely to avoid unecessary ajax requests.

- Building a complex admin panel.

- Using redux for better global state management

- Using firebase

- Using MUI




## Authors

- [@MisterNooblet](https://www.github.com/MisterNooblet)


## 🚀 About Me

I'm a full stack development student.


## Getting Started

To get started with the project, follow these steps:

Clone the repository:
```bash 
git clone https://github.com/MisterNooblet/handy-dandy.git
```
Install dependencies:
```bash 
npm install
```
Start the development server: 
```bash 
npm start
```
The app will be served at http://localhost:3000/.

Don't forget to add your own firebase config.

## PS

Feel free to use the code and don't forget to Star ⭐ the repository.

