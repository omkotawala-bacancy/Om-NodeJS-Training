/*
    async function getUser() {
    try {
        const user = database.findById(5);
        return user.name;
    } catch (err) {
        console.error("Error occurred");
    }
    }

    getUser();

    a). Here the catch block doesn't catches the error because the error handling is done for the synchronous code but the database is asynchronous so here the function will return the user.name as <Promise: pending> and will not catch the error if the database fails to fetch the data.
*/

// b). fixed code for the proper error handling is 

async function getUser() {
    try {
        const user = await database.findById(5);
        return user.name;
    } catch (err) {
        console.error("Error occurred");
    }
    }

    getUser();

// c). The error is the asynchronous and should be hanled that way only.