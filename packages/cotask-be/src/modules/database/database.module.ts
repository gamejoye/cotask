import { DATA_SOURCE } from '@cotask-be/common/constans/table-repos';
import { Module } from '@nestjs/common';
import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: DATA_SOURCE,
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'gamejoye',
        password: '123456',
        database: 'cotask',
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: false, // 禁用自动同步
        extra: {
          dateStrings: true,
        },
      });
      return dataSource.initialize();
    },
  },
];

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
