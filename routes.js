const routes = require ('next-routes')();

routes.add('/campaigns/new', '/campaigns/new')//the colon says its a wildcard
.add('/campaigns/:address', '/campaigns/show')//the colon says its a wildcard
.add('/campaigns/:address/requests','/campaigns/requests/index')
.add('/campaigns/:address/requests/new','/campaigns/requests/new');
module.exports = routes;