export interface paths {
  '/auth/login': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /** 用户登录 */
    post: operations['AuthController_login'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/auth/register': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /** 用户注册 */
    post: operations['AuthController_register'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/todos/today': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** 获取今日todo */
    get: operations['TodosController_getTodosByToday'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/todos/all': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** 获取所有todo */
    get: operations['TodosController_getAllTodos'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/todos/{id}': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** 根据id获取todo */
    get: operations['TodosController_getTodoById'];
    /** 更新todo */
    put: operations['TodosController_updateTodo'];
    post?: never;
    /** 删除todo */
    delete: operations['TodosController_deleteTodo'];
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/todos': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** 根据groupId获取todo */
    get: operations['TodosController_getTodosByGroupId'];
    put?: never;
    /** 创建todo */
    post: operations['TodosController_createTodo'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/groups': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** 根据user_id分页获取分组 */
    get: operations['GroupsController_getGroups'];
    put?: never;
    /** 创建分组 */
    post: operations['GroupsController_createGroup'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/groups/{id}': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    /** 更新群组 */
    put: operations['GroupsController_updateGroup'];
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/ai/todo/complete/title': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /** 生成待办事项标题 */
    post: operations['AiController_completeTodoTitle'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/ai/todo/complete/description': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /** 生成待办事项描述 */
    post: operations['AiController_completeTodoDescription'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
}
export type webhooks = Record<string, never>;
export interface components {
  schemas: {
    ApiBaseResult: {
      /** @description Http状态码 */
      statusCode: number;
      /** @description Http内容的简要概述 */
      message: string;
    };
    UserVo: {
      /**
       * @description 用户id
       * @example 1
       */
      id: number;
      /**
       * @description 用户名
       * @example gamejoye
       */
      username: string;
      /**
       * @description 用户邮箱
       * @example gamejoye@gmail.com
       */
      email: string;
      /**
       * @description 用户头像
       * @example https://avatars.githubusercontent.com/u/88575063?v=4
       */
      avatarUrl: string;
      /**
       * @description 创建时间
       * @example 2022-01-02 00:00:00
       */
      createdAt: string;
      /**
       * @description 更新时间
       * @example 2022-01-01 00:00:00
       */
      updatedAt: string;
    };
    LoginVo: {
      /** @description 用户信息 */
      user: components['schemas']['UserVo'];
      /**
       * @description 用户token
       * @example token
       */
      token: string;
    };
    LoginUserDto: {
      /**
       * @description 用户邮箱
       * @example gamejoye@gmail.com
       */
      email: string;
      /**
       * @description 用户密码
       * @example 123456..
       */
      password: string;
    };
    RegisterUserDto: {
      /**
       * @description 用户名
       * @example gamejoye
       */
      username: string;
      /**
       * @description 用户邮箱
       * @example gamejoye@gmail.com
       */
      email: string;
      /**
       * @description 用户密码
       * @example 123456..
       */
      password: string;
      /**
       * @description 验证码
       * @example 123456
       */
      code: string;
    };
    CircleTimeOptions: {
      /**
       * @description 循环周期
       * @example 1
       */
      circleTime: number;
      /**
       * @description 循环周期内选择的日期，如果循环周期无法选择日期，传递空数组就好
       * @example [
       *       1,
       *       2,
       *       3
       *     ]
       */
      days: number[];
    };
    FrequencyOption: {
      /**
       * @description 频率类型（不包括 NONE）
       * @example DAILY
       * @enum {string}
       */
      type: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY';
      /** @description 循环周期配置 */
      options: components['schemas']['CircleTimeOptions'];
    };
    TodoVo: {
      /**
       * @description todo唯一id
       * @example 1
       */
      id: number;
      /**
       * @description todo标题
       * @example Learn React
       */
      title: string;
      /**
       * @description todo描述
       * @example 一周之内学会如何使用React写一个应用
       */
      description: string;
      /**
       * @description todo优先级
       * @example HIGH
       * @enum {string|null}
       */
      priority: 'HIGH' | 'MEDIUM' | 'LOW' | null;
      /**
       * @description todo频率
       * @example NONE
       * @enum {string}
       */
      frequency: 'NONE' | 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY';
      /**
       * @description todo频率选项
       * @example null
       */
      frequencyOption: components['schemas']['FrequencyOption'] | null;
      /**
       * @description todo截止日期
       * @example 2022-01-03
       */
      dueDate: string;
      /**
       * @description todo是否完成
       * @example false
       */
      completed: boolean;
      /** @description 创建者信息 */
      createdBy: components['schemas']['UserVo'];
      /**
       * @description 创建时间
       * @example 2022-01-01 00:00:00
       */
      createdAt: string;
      /**
       * @description 更新时间
       * @example 2022-01-02 00:00:00
       */
      updatedAt: string | null;
    };
    GetTodosVo: {
      /**
       * @description 待办事项总条数
       * @example 1
       */
      total: number;
      /** @description 待办事项数据 */
      data: components['schemas']['TodoVo'][];
    };
    CreateTodoDto: {
      /**
       * @description todo标题
       * @example Learn React
       */
      title: string;
      /**
       * @description todo描述
       * @example 一周之内学会如何使用React写一个应用
       */
      description: string;
      /**
       * @description todo优先级
       * @example HIGH
       * @enum {string|null}
       */
      priority: 'HIGH' | 'MEDIUM' | 'LOW' | null;
      /**
       * @description todo频率
       * @example NONE
       * @enum {string}
       */
      frequency: 'NONE' | 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY';
      /**
       * @description todo频率选项
       * @example null
       */
      frequencyOption: {
        /**
         * @description 频率类型
         * @enum {string}
         */
        type?: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY';
        options?: {
          /** @example 1 */
          circleTime?: number;
          /** @example [
           *       1,
           *       3,
           *       5
           *     ] */
          days?: number[];
        };
      } | null;
      /**
       * @description todo截止日期
       * @example 2023-01-01
       */
      dueDate: string;
      /**
       * @description 创建者id
       * @example 1
       */
      createdBy: number;
      /**
       * @description 组id
       * @example 1
       */
      groupId: number;
    };
    UpdateTodoDto: {
      /**
       * @description todo标题
       * @example Learn React
       */
      title: string;
      /**
       * @description todo是否完成
       * @example false
       */
      completed: boolean;
      /**
       * @description todo描述
       * @example 一周之内学会如何使用React写一个应用
       */
      description: string;
      /**
       * @description todo优先级
       * @example HIGH
       * @enum {string|null}
       */
      priority: 'HIGH' | 'MEDIUM' | 'LOW' | null;
      /**
       * @description todo频率
       * @example NONE
       * @enum {string}
       */
      frequency: 'NONE' | 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY';
      /**
       * @description todo频率选项
       * @example null
       */
      frequencyOption: {
        /**
         * @description 频率类型
         * @enum {string}
         */
        type?: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY';
        options?: {
          /** @example 1 */
          circleTime?: number;
          /** @example [
           *       1,
           *       3,
           *       5
           *     ] */
          days?: number[];
        };
      } | null;
      /**
       * @description todo截止日期
       * @example 2023-01-01
       */
      dueDate: string;
    };
    GroupVo: {
      /**
       * @description 分组id
       * @example 1
       */
      id: number;
      /**
       * @description 分组名称
       * @example 学习
       */
      name: string;
      /**
       * @description 分组描述
       * @example 寒假ACM集训
       */
      description: string;
      /** @description 创建人 */
      createdBy: components['schemas']['UserVo'];
      /**
       * @description 创建时间
       * @example 2022-01-02 00:00:00
       */
      createdAt: string;
      /**
       * @description 更新时间
       * @example 2022-01-01 00:00:00
       */
      updatedAt: string;
    };
    GetGroupsVo: {
      /**
       * @description 分组总条数
       * @example 1
       */
      total: number;
      /** @description 分组数据 */
      data: components['schemas']['GroupVo'][];
    };
    CreateGroupDto: {
      /**
       * @description 分组名称
       * @example 学习
       */
      name: string;
      /**
       * @description 分组描述
       * @example 寒假ACM集训
       */
      description: string;
      /**
       * @description 创建者
       * @example 1
       */
      createdBy: number;
    };
    UpdateGroupDto: {
      /**
       * @description 分组名称
       * @example 学习
       */
      name: string;
      /**
       * @description 分组描述
       * @example 寒假ACM集训
       */
      description: string;
    };
    CompleteTodoDto: {
      /**
       * @description 待办事项标题
       * @example 学习英语
       */
      title: string;
      /**
       * @description 待办事项描述
       * @example 每天早上6点起床，学习英语30分钟，然后去上班
       */
      description: string;
    };
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
  AuthController_login: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        'application/json': components['schemas']['LoginUserDto'];
      };
    };
    responses: {
      /** @description 登录成功 */
      201: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ApiBaseResult'] & {
            data: components['schemas']['LoginVo'];
          };
        };
      };
    };
  };
  AuthController_register: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        'application/json': components['schemas']['RegisterUserDto'];
      };
    };
    responses: {
      /** @description 注册成功 */
      201: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ApiBaseResult'] & {
            data: components['schemas']['UserVo'];
          };
        };
      };
    };
  };
  TodosController_getTodosByToday: {
    parameters: {
      query: {
        /** @description paging起始位置 */
        _start: number;
        /** @description paging结束位置（不包括当前） */
        _end: number;
        /** @description 排序方式 */
        _order: 'ASC' | 'DESC';
        /** @description 排序所依据的属性 */
        _sort: string;
        /** @description 用户id */
        user_id: number;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description 成功todo列表 */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ApiBaseResult'] & {
            data: components['schemas']['GetTodosVo'];
          };
        };
      };
    };
  };
  TodosController_getAllTodos: {
    parameters: {
      query: {
        /** @description paging起始位置 */
        _start: number;
        /** @description paging结束位置（不包括当前） */
        _end: number;
        /** @description 排序方式 */
        _order: 'ASC' | 'DESC';
        /** @description 排序所依据的属性 */
        _sort: string;
        /** @description 用户id */
        user_id: number;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description 成功todo列表 */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ApiBaseResult'] & {
            data: components['schemas']['GetTodosVo'];
          };
        };
      };
    };
  };
  TodosController_getTodoById: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        id: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description 成功todo */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ApiBaseResult'] & {
            data: components['schemas']['TodoVo'];
          };
        };
      };
      /** @description todo不存在 */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  TodosController_updateTodo: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        id: number;
      };
      cookie?: never;
    };
    requestBody: {
      content: {
        'application/json': components['schemas']['UpdateTodoDto'];
      };
    };
    responses: {
      /** @description 返回更新后的Todo，如果completed为true，则返回null */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ApiBaseResult'] & {
            data: components['schemas']['TodoVo'] | null;
          };
        };
      };
    };
  };
  TodosController_deleteTodo: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        id: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description 成功删除todo */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ApiBaseResult'] & {
            data: boolean;
          };
        };
      };
    };
  };
  TodosController_getTodosByGroupId: {
    parameters: {
      query: {
        /** @description paging起始位置 */
        _start: number;
        /** @description paging结束位置（不包括当前） */
        _end: number;
        /** @description 排序方式 */
        _order: 'ASC' | 'DESC';
        /** @description 排序所依据的属性 */
        _sort: string;
        /** @description 群组id */
        group_id: number;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description 成功todo列表 */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ApiBaseResult'] & {
            data: components['schemas']['GetTodosVo'];
          };
        };
      };
      /** @description group不存在 */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  TodosController_createTodo: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        'application/json': components['schemas']['CreateTodoDto'];
      };
    };
    responses: {
      /** @description 成功创建todo */
      201: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ApiBaseResult'] & {
            data: components['schemas']['TodoVo'];
          };
        };
      };
    };
  };
  GroupsController_getGroups: {
    parameters: {
      query: {
        /** @description paging起始位置 */
        _start: number;
        /** @description paging结束位置（不包括当前） */
        _end: number;
        /** @description 排序方式 */
        _order: 'ASC' | 'DESC';
        /** @description 排序所依据的属性 */
        _sort: string;
        /** @description 用户id */
        user_id: number;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description 分组数据 */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ApiBaseResult'] & {
            data: components['schemas']['GetGroupsVo'];
          };
        };
      };
    };
  };
  GroupsController_createGroup: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        'application/json': components['schemas']['CreateGroupDto'];
      };
    };
    responses: {
      /** @description 分组数据 */
      201: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ApiBaseResult'] & {
            data: components['schemas']['GroupVo'];
          };
        };
      };
    };
  };
  GroupsController_updateGroup: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        id: number;
      };
      cookie?: never;
    };
    requestBody: {
      content: {
        'application/json': components['schemas']['UpdateGroupDto'];
      };
    };
    responses: {
      /** @description 分组更新后的数据 */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ApiBaseResult'] & {
            data: components['schemas']['GroupVo'];
          };
        };
      };
    };
  };
  AiController_completeTodoTitle: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        'application/json': components['schemas']['CompleteTodoDto'];
      };
    };
    responses: {
      /** @description ai生成的待办事项标题 */
      201: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ApiBaseResult'] & {
            data: string[];
          };
        };
      };
    };
  };
  AiController_completeTodoDescription: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        'application/json': components['schemas']['CompleteTodoDto'];
      };
    };
    responses: {
      /** @description ai生成的待办事项描述 */
      201: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ApiBaseResult'] & {
            data: string[];
          };
        };
      };
    };
  };
}
