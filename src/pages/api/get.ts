// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { GetObjectCommand, ListObjectsCommand, ListObjectsV2Command, S3Client } from "@aws-sdk/client-s3"

type Data = {
  name: string
}

// examples git https://github.com/awsdocs/aws-doc-sdk-examples/blob/main/javascriptv3/example_code/s3/actions/list-objects.js#L8
// examples document https://docs.aws.amazon.com/ja_jp/sdk-for-javascript/v3/developer-guide/javascript_s3_code_examples.html

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  

  const command = new ListObjectsV2Command({
    Bucket: 'amplify-next-s3', MaxKeys: 1
  })

  // 環境変数により、クレデンシャルを渡している。
  // IAMユーザーはS3アクセスできるものを作る。ユーザーを作成すること以外にもやり方はあると思う。
  const client = new S3Client({})

  try {
    let isTruncated: boolean | undefined = true;

    console.log("Your bucket contains the following objects:\n")
    let contents = "";
    
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

  res.status(200).json({ name: 'John Doe' })

}
