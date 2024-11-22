output "eks_cluster_id" {
  value = module.eks.cluster_id
}

output "eks_node_group_arns" {
  value = module.eks.node_group_arns
}
