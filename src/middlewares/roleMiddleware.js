module.exports = (roles) => {
  return (req, res, next) => {
    //kullanıcı rolunu aldık
    const userRole = req.body.role; // register alanında olusturdugumuz form alanından alıcagımız name olucak burda yani role

    //kullanıcı rollerin icerisinde aldıgım role var mı yok mu
    if (roles.includes(userRole)) {
      //eğer varsa bir sonraki işleme geç
      next();
    } else {
      res.status(400).send('YOU CANT DO IT');
    }
  };
};
