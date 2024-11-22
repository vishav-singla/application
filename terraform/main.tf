provider "aws" {
  region = "us-east-1"
}

module "eks" {
  source          = "terraform-aws-modules/eks/aws"
  cluster_name    = "docx2pdf-cluster"
  cluster_version = "1.21"
  subnets         = ["subnet-12345", "subnet-67890"]
  vpc_id          = "vpc-12345"
  node_groups = {
    eks_nodes = {
      desired_capacity = 2
      max_capacity     = 3
      min_capacity     = 1
    }
  }
}

output "kubeconfig" {
  value = module.eks.kubeconfig
}
