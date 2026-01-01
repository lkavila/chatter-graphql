import { Injectable } from '@nestjs/common';
import { PutObjectCommand, S3Client, S3ClientConfig } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { FileUploadOptions } from './file-upload-options.interface';
import { MAIN_BUCKET } from '../constants/aws';

@Injectable()
export class S3Service {
  private readonly client: S3Client;

  constructor(private readonly configService: ConfigService) {
    const acceskey = configService.getOrThrow<string>('AWS_ACCESS_KEY');
    const secretkey = configService.getOrThrow<string>('AWS_SECRET_ACCESS_KEY');

    const clientConfig: S3ClientConfig = {
      region: configService.getOrThrow<string>('AWS_REGION'),
    };
    clientConfig.credentials = {
      accessKeyId: acceskey,
      secretAccessKey: secretkey,
    };
    this.client = new S3Client(clientConfig);
  }

  async uploadFile({ folder, key, file }: FileUploadOptions) {
    await this.client.send(
      new PutObjectCommand({
        Bucket: MAIN_BUCKET,
        Key: `${folder}/${key}`,
        Body: file,
      }),
    );
  }

  getObjectUrl(folder: string, key: string) {
    return `https://${MAIN_BUCKET}.s3.amazonaws.com/${folder}/${key}`;
  }

  async deleteObject(folder: string, key: string) {
    await this.client.send(
      new PutObjectCommand({
        Bucket: MAIN_BUCKET,
        Key: `${folder}/${key}`,
        Body: '',
      }),
    );
  }
}
