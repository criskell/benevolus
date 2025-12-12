resource "aws_iam_user" "benevolus" {
  name = "benevolus"
}

resource "aws_iam_access_key" "benevolus_access_key" {
  user = aws_iam_user.benevolus.name
}

resource "aws_iam_user_policy" "benevolus_policy" {
  name = "benevolus-policy"
  user = aws_iam_user.benevolus.name

  policy = jsonencode({
    Version = "2012-10-17"

    Statement = [
      {
        Effect = "Allow"
        Action = [
          "s3:PutObject",
          "s3:GetObject",
          "s3:DeleteObject",
          "s3:ListBucket"
        ]
        Resource = [
          aws_s3_bucket.uploads.arn,
          "${aws_s3_bucket.uploads.arn}/*"
        ]
      }
    ]
  })
}
