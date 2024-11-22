output "vpc_id" {
  value = aws_vpc.eks_vpc.id
}

output "subnet_ids" {
  value = aws_subnet.eks_subnets[*].id
}

output "eks_cluster_endpoint" {
  value = aws_eks_cluster.eks_cluster.endpoint
}

output "eks_cluster_name" {
  value = aws_eks_cluster.eks_cluster.name
}

output "kubeconfig" {
  value = aws_eks_cluster.eks_cluster.identity[0].oidc.issuer
}

resource "local_file" "kubeconfig" {
  filename = "${path.module}/kubeconfig.yaml"
  content = templatefile("${path.module}/templates/kubeconfig.tpl", {
    cluster_name = aws_eks_cluster.eks_cluster.name
    cluster_endpoint = aws_eks_cluster.eks_cluster.endpoint
    cluster_certificate_authority = base64decode(aws_eks_cluster.eks_cluster.certificate_authority[0].data)
  })
}

data "template_file" "kubeconfig" {
  template = file("${path.module}/templates/kubeconfig.tpl")
  vars = {
    cluster_name                  = aws_eks_cluster.eks_cluster.name
    cluster_endpoint              = aws_eks_cluster.eks_cluster.endpoint
    cluster_certificate_authority = base64decode(aws_eks_cluster.eks_cluster.certificate_authority[0].data)
  }
}
