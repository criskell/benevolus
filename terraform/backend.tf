terraform {
  backend "s3" {
    bucket  = "benevolus-terraform"
    key     = "terraform.tfstate"
    region  = "us-east-2"
    encrypt = true
  }
}
