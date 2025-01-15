/* eslint-disable @typescript-eslint/no-unused-vars */
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../dist/app.module.js';
import {
  documentDescription,
  documentTag,
  documentVersion,
  swaggerTitle,
} from '../dist/common/constans/swagger.js';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { writeFileSync, unlinkSync } from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import openapiTS, { astToString } from 'openapi-typescript';
import { execSync } from 'child_process';
import inquirer from 'inquirer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const monorepoRootPath = path.resolve(__dirname, '../../../');

/**
 * 这里生成类型文件是依赖于当前文件夹结构的
 * 如果未来当前sync-types.mjs脚本或者@cotask/types项目结构有改变的话
 * 需要进行该脚本的重写
 */

const jsonDist = path.resolve(monorepoRootPath, 'packages/types/src/generated/openapi.json');
const tsDist = path.resolve(monorepoRootPath, `packages/types/src/generated/openapi.d.ts`);

console.log('✅ generated file path => ', [jsonDist, tsDist]);
try {
  unlinkSync(jsonDist);
  unlinkSync(tsDist);
} catch (o_O) {}

(async function run() {
  const app = await NestFactory.create(AppModule);
  try {
    const options = new DocumentBuilder()
      .setTitle(swaggerTitle)
      .setDescription(documentDescription)
      .setVersion(documentVersion)
      .addTag(documentTag)
      .build();

    const document = SwaggerModule.createDocument(app, options);
    writeFileSync(jsonDist, JSON.stringify(document, null, 2));
    console.log(`✅ 成功生成JSON定义到: ${jsonDist}`);

    // 生成Typescript类型定义
    const tsOutput = await openapiTS(document);
    writeFileSync(tsDist, astToString(tsOutput), 'utf-8');
    console.log(`✅ 成功生成类型定义到: ${tsDist}`);

    // 询问是否进行git提交
    const answers = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'confirmCommit',
        message: '是否执行 git add & commit?',
        default: false,
      },
    ]);

    if (answers.confirmCommit) {
      // 执行git commit
      try {
        console.log('✅ 开始执行 git add & commit');
        execSync(`git add ${jsonDist} ${tsDist}`, { stdio: 'inherit' });

        execSync("git commit -m 'chore: 自动更新 openapi types [skip ci]'", {
          stdio: 'inherit',
        });
      } catch (v_V) {
        console.error('❌ Git 提交失败:', v_V);
      }
    }
  } catch (v_V) {
    console.log('❌ 生成类型定义失败', v_V);
  } finally {
    await app.close();
    process.exit(0);
  }
})();
