import { HttpStatus } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { ApiExtraModels } from '@nestjs/swagger';
import type { Type } from '@nestjs/common';
import { applyDecorators } from '@nestjs/common';

export class ApiBaseResult {
  @ApiProperty({
    description: 'Http状态码',
    examples: [HttpStatus.OK, HttpStatus.CREATED, HttpStatus.NOT_FOUND, HttpStatus.FORBIDDEN],
  })
  statusCode: HttpStatus;
  @ApiProperty({
    description: 'Http内容的简要概述',
    examples: ['用户权限不足', '未找到资源'],
  })
  message: string;
}

export interface IApiResult<T> extends ApiBaseResult {
  data: T;
}

export const ApiOkResponseResult = <T extends Type | 'string' | 'number' | 'boolean'>(options: {
  model: T;
  description?: string;
  isArray?: boolean;
  nullable?: boolean;
}) => {
  const { model, description, isArray, nullable } = options;
  const isPrimitive = ['string', 'number', 'boolean'].includes(model as string);

  const schema = isPrimitive ? { type: model as string } : { $ref: getSchemaPath(model as Type) };
  const dataSchema = isArray ? { type: 'array', items: schema } : schema;
  const nullableSchema = nullable ? { oneOf: [dataSchema, { type: 'null' }] } : dataSchema;

  const decorators = [
    ApiExtraModels(ApiBaseResult),
    ApiOkResponse({
      description,
      schema: {
        allOf: [
          { $ref: getSchemaPath(ApiBaseResult) },
          {
            properties: {
              data: nullableSchema,
            },
            required: ['data'],
          },
        ],
      },
    }),
  ];

  if (!isPrimitive) {
    decorators.unshift(ApiExtraModels(model as Type));
  }

  return applyDecorators(...decorators);
};

export const ApiCreatedResponseResult = <
  T extends Type | 'string' | 'number' | 'boolean',
>(options: {
  model: T;
  description?: string;
  isArray?: boolean;
}) => {
  const { model, description, isArray } = options;
  const isPrimitive = ['string', 'number', 'boolean'].includes(model as string);
  const schema = isPrimitive ? { type: model as string } : { $ref: getSchemaPath(model as Type) };
  const decorators = [
    ApiExtraModels(ApiBaseResult),
    ApiCreatedResponse({
      description,
      schema: {
        allOf: [
          { $ref: getSchemaPath(ApiBaseResult) },
          {
            properties: {
              data: isArray ? { type: 'array', items: schema } : schema,
            },
            required: ['data'],
          },
        ],
      },
    }),
  ];

  if (!isPrimitive) {
    decorators.unshift(ApiExtraModels(model as Type));
  }

  return applyDecorators(...decorators);
};
