provider "aws" {
  region = "us-east-2"
}

resource "aws_s3_bucket" "images" {
  bucket = "benevolus-images"
}

resource "aws_s3_bucket_public_access_block" "images_access_block" {
  bucket = aws_s3_bucket.images

  block_public_acls       = true
  block_public_policy     = true
  restrict_public_buckets = true
}
