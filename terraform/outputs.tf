output "benevolus_access_key" {
  value     = aws_iam_access_key.benevolus_access_key.id
  sensitive = true
}

output "benevolus_secret_key" {
  value     = aws_iam_access_key.benevolus_access_key.secret
  sensitive = true
}
