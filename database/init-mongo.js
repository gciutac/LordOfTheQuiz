db = db.getSiblingDB('quizGameDB') // This switches the context to the flashcardsDB database

db.createUser({
  user: 'QuizGameUser',
  pwd: 'password',
  roles: [
    {
      role: 'readWrite',
      db: 'quizGameDB',
    },
  ],
})
