# Phase 1: APIs

### Name: Xinze Zhao &nbsp;&nbsp;&nbsp; StudentID: 1002897261

### Name: Xingyue Dai &nbsp;&nbsp;&nbsp; StudentID: 1002317806

### Name: Xinqi Shen &nbsp;&nbsp;&nbsp; StudentID: 1003567918

### Name: Jiahao Yan &nbsp;&nbsp;&nbsp; StudentID: 1001665432

---

## Basic Idea for our web application

Our group plans to build an online *music sharing platform*. Anyone who is enthusiastic about music is our potential user.
Follows are the features we plan to implement in our web application:

> These features might differ if we find that it's hard to implement in the future, so we brainstormed as many features as possible.

- You can upload your **own audio** and add any **textual descriptions**.

- There would be kinds of channels for **Personal FM**.

- specific daily **song-recommandation** based on users' music taste. 

- Share the **info/statistics** of your favourite **track/artist/album**.

- Explore the **lyrics** of your favourite **tracks**.

- See the **events** held by your favourite artists.

- Check out **popularity charts** and **cover arts**.

- Basically, all about **music**.

---

## A brief description

Our currently selected API's are '*iTunes Search*'and '*Lyrics.ovh*'. One for searching metadata, and the other for displaying lyrics. And '*Musikki*' is our back-up music database supplier.

**iTunes Search**: We can get access to all the basic information about tracks/artists/albums using this API.

**Lyrics.ovh**: Use this API to get lyrics on request.

*Notice that* we might add more API's to this list if we wish to add new features to our application.

---

## Answers to the questions

1. Is the API well documented?

    `iTunes Search` is well documented and includes a lot of examples that are quite helpful. Additionally, various options acorss each method are supported.

    On the contrary, `Lyrics.ovh` does not have much documentation. However, this API is not hard to interact with due to its simple functionality i.e. display lyrics.

2. Does this API uses a RESTful notation to access such collections/resourses? (Give examples)

    Yes. They all support HTTP methods and are stateless. The URIs are directory structure-like e.g. `https://api.lyrics.ovh/v1/kanye_west/famous` if we wish to fetch the lyrics of track 'famous' by Kanye West. And we will get a JSON formatted data returned from the example above.

3. Which HTTP methods are supported by the API?

    Only `GET` is supported for both of the API's.

4. Explain how the information about these resources/collections will be integrated into your application.

    As we mentioned before, the metadata collected from `iTunes Search` will be used to fetch all the basic information of track/artist/album, and `Lyrics.ovh` will be used to display lyrics on request.

---

Implement the following two functions:

- getCollection: it should accept a callback, send a request to retrieve the full collection from your chosen API, wait until a response is received and callback with an array of objects, where each object is an item from the collection.  You are free to decide how many items are returned.

- getSortedCollection: it should accept a callback, retrieve the full collection, sort the collection using the criteria you think makes the most sense for its items and callback with a sorted array of objects.

Run using `node main.js`
