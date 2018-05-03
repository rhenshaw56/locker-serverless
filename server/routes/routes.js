const routes = (router) => {
  router.get('/', (req, res) => {
    res.json({
      status: 'Welcome to API'
    });
  });
};

export default routes;