// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { GetObjectCommand, ListObjectsCommand, ListObjectsV2Command, S3Client } from "@aws-sdk/client-s3"
// import { getSecrets } from '@/lib/getSecrets'
type Data = {
  name: string,
  contents: string
}

// examples git https://github.com/awsdocs/aws-doc-sdk-examples/blob/main/javascriptv3/example_code/s3/actions/list-objects.js#L8
// examples document https://docs.aws.amazon.com/ja_jp/sdk-for-javascript/v3/developer-guide/javascript_s3_code_examples.html

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {


  // 作ったバケット amplify-next-s3
  // デフォルトのプライベートで良い。
  const command = new ListObjectsV2Command({
    Bucket: 'amplify-next-s3', MaxKeys: 1
  })

  // シークレットを環境変数により、クレデンシャルを渡している。
  // IAMユーザーはS3アクセス, シークレットアクセスできるものを作っておく。ユーザーを作成すること以外にもやり方はあると思う。
  // このやり方は一時的
  // const secrets = await getSecrets();
  // console.log(secrets)
  
  

  // 本来はこのnew S3Clientのコンストラクタにクレデンシャル渡す。
  const client = new S3Client({})

  let contents = "";
  //バケットのなかのオブジェクトのファイルを取得するサンプル
  try {
    let isTruncated: boolean | undefined = true;

    console.log("Your bucket contains the following objects:\n")

    while (isTruncated) {
      const { Contents, IsTruncated, NextContinuationToken } = await client.send(command);
      const contentsList = Contents && Contents.map((c) => ` • ${c.Key}`).join("\n");
      contents += contentsList + "\n";
      isTruncated = IsTruncated;
      command.input.ContinuationToken = NextContinuationToken;
    }
    console.log(contents);

  } catch (err) {
    console.error(err);
  }

  res.status(200).json({ name: 'bucketの中身は', contents: contents })

}
