const routes = require ('next-routes')();

routes.add('/campaigns/new', '/campaigns/new');//the conolon says its a wildcard
routes.add('/campaigns/:address', '/campaigns/show');//the conolon says its a wildcard
module.exports = routes;