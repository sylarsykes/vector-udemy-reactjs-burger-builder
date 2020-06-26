/**
 * ServiceParams class with properties to use in services
 * 
 * Contains the next properties:
 *          - request:               RequestInfo object
 *          - successFuncCB:         Success callback
 *          - errorFuncCB:           Error callbacks
 *          - context:               Context for callbackse
 */
class ServiceParams {
    
    constructor(builder)  {
        this.context = builder.context;
        this.successFuncCB = builder.successFuncCB;
        this.errorFuncCB = builder.errorFuncCB;
        this.request = builder.request;
    }
}

/**
 * FindServiceParams class with properties to use in finds (findAll, findById...) services
 * 
 * Contains the next properties:
 *          - request:               RequestInfo object
 *          - successFuncCB:         Success callback
 *          - errorFuncCB:           Error callback
 *          - builderModelFuncCB:    Builder callback
 *          - params:                Object with extra properties
 *          - context:               Context for callbacks
 */
class FindServiceParams extends ServiceParams {

    constructor(builder) {
        super(builder);

        this.params = builder.params;
        this.builderModelFuncCB = builder.builderModelFuncCB;
    }
}

/**
 * ServiceParams builder
 */
class ServiceParamsBuilder {

    get context() {
        return this._context;
    }

    setContext = (context) => {
        this._context = context;
        return this;
    }

    get successFuncCB() {
        return this._successFuncCB;
    }

    setSuccessFuncCB = (successFuncCB) => {
        this._successFuncCB = successFuncCB;
        return this;
    }

    get errorFuncCB() {
        return this._errorFuncCB;
    }

    setErrorFuncCB = (errorFuncCB) => {
        this._errorFuncCB = errorFuncCB;
        return this;
    }

    get request() {
        return this._request;
    }

    setRequest = (request) => {
        this._request = new RequestInfoBuilder()
            .setPath(request.path)
            .setBody(request.body)
            .setConfig(request.config)
            .build();

        return this;
    }

    build = () => {
        return new ServiceParams(this);
    }
}

/**
 * FindServiceParams builder
 */
class FindServiceParamsBuilder extends ServiceParamsBuilder {
    
    get params() {
        return this._params;
    }

    setParams = (params) => {
        this._params = params;
        return this;
    }

    get builderModelFuncCB() {
        return this._builderModelFuncCB;
    }

    setBuilderModelFuncCB = (builderModelFuncCB) => {
        this._builderModelFuncCB = builderModelFuncCB;
        return this;
    }

    build = () => {
        return new FindServiceParams(this);
    }
}

/**
 * Request info object
 */
class RequestInfo {

    constructor(builder) {
        this.path = builder.path;
        this.body = builder.body;
        this.config = builder.config;
    }
}

/**
 * RequestInfo builder
 */
class RequestInfoBuilder {

    get path() {
        return this._path;
    }

    setPath = (path) => {
        this._path = path;
        return this;
    }

    get body() {
        return this._body;
    }

    setBody = (body) => {
        this._body = body;
        return this;
    }

    get config() {
        return this._config;
    }

    setConfig = (config) => {
        this._config = config;
        return this;
    }

    build = () => {
        return new RequestInfo(this);
    }

}

export { 
    ServiceParams, FindServiceParams, ServiceParamsBuilder, 
    FindServiceParamsBuilder, RequestInfo, RequestInfoBuilder
};