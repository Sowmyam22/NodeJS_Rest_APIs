exports.getPosts = (req, res, next) => {
    res.status(200).json({
        posts: [{ title: 'First Book', content: 'Some dummy content!' }]
    });
};

exports.createPost = (req, res, next) => {
    // create post in db
    const { title, content } = req.body;

    res.status(201).json({
        message: 'Post created Successfully!',
        post: { id: new Date().toISOString(), title: title, content: content }
    })
}