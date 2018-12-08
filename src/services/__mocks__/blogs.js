let token = null

const blogs = [
  {
    _id: "5bf8179caf33e954d622ecda",
    title: "Bitcoin",
    author: "Satoshi",
    url: "To the moon",
    likes: 63,
    user:{
      _id: "5bf8173aaf33e954d622ecd6",
      username :"Testeri1",
      name :"Test Ester1"
    }
  },
  {
    _id: "5bf817edaf33e954d622ecdb",
    title: "Ethereum",
    author: "Vitalik Buterin",
    url: "https://twitter.com/vitalikbuterin",
    likes: 20,
    user: {
      _id: "5bf8173aaf33e954d622ecd6",
      username: "Testeri1",
      name: "Test Ester1"
    }
  },
  {
    _id: "5bf818b2af33e954d622ecdc",
    title: "Lost in Translation",
    author: "Sofia Coppola",
    url: "https://www.imdb.com/title/tt0335266/",
    likes: 18,
    user: {
      _id: "5bf81742af33e954d622ecd7",
      username: "Testeri2",
      name: "Test Ester2"
    }
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

export default { getAll, blogs }