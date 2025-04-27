# Enhanced Multi-Cloud Learning Framework: The Global Digital Warehouse

## Introduction

This enhanced framework provides a comprehensive, sequential approach to mastering multi-cloud concepts across AWS, GCP, and Azure using the "Global Digital Warehouse" metaphor. The framework is designed to guide learners through a progressive, interconnected journey of cloud concepts while maintaining flexibility for different learning styles and goals.

## Learning Methodology

### Sequential Learning Workflow

For each phase, follow this structured sequence:

1. **Concept Understanding** (1-2 days)
   - Grasp the core purpose of the service category
   - Understand the warehouse metaphor connection
   - Master fundamental terminology

2. **Vendor Exploration** (2-3 days per vendor)
   - Learn specific services offered by each cloud provider
   - Understand key features and capabilities
   - Review service limitations and constraints

3. **Comparison Analysis** (1-2 days)
   - Analyze similarities and differences
   - Evaluate strengths and weaknesses
   - Compare pricing models and integration points

4. **Practical Application** (3-5 days)
   - Complete hands-on exercises for each provider
   - Build mini-projects using the services
   - Troubleshoot common issues

5. **Integration Challenge** (2-3 days)
   - Connect with previously learned services
   - Solve a multi-service problem
   - Consider multi-cloud implementations

6. **Assessment & Reflection** (1 day)
   - Complete knowledge validation checkpoint
   - Review certification alignment
   - Reflect on practical applications

### Progress Tracking

Track your progress using this skills matrix for each phase:

| Skill Area | AWS | GCP | Azure |
|------------|-----|-----|-------|
| Theoretical knowledge | ⭘ | ⭘ | ⭘ |
| Console navigation | ⭘ | ⭘ | ⭘ |
| Service configuration | ⭘ | ⭘ | ⭘ |
| Problem-solving | ⭘ | ⭘ | ⭘ |
| Integration knowledge | ⭘ | ⭘ | ⭘ |

*Legend: ⭘ Not started, ⚪ In progress, ⬤ Completed*

## Learning Path Overview

```
[Phase 0: Foundations] → [Phase 1: IAM] → [Phase 2: Storage] 
       ↓                      ↓                 ↓
[Phase 3: Compute] ←→ [Phase 5: Serverless] → [Phase 4: Databases]
       ↓                      ↓                 ↓
[Phase 6: Networking] → [Phase 7: Monitoring] → [Phase 8: DevOps]
       ↓                      ↓                 ↓
[Phase 9: Big Data] ←→ [Phase 10: AI/ML] → [Phase 11: Security]
                              ↓
                    [Phase 12: Multi-Cloud Strategy]
```

## Phase 0: Foundational Concepts (The Warehouse Blueprint)

### Metaphor
The overall design, purpose, and rules of the Global Digital Warehouse.

### Learning Objectives
- Define core cloud computing concepts (IaaS, PaaS, SaaS)
- Explain cloud benefits and deployment models
- Articulate multi-cloud rationale and challenges
- Navigate basic console/portal interfaces for all three providers

### Key Concepts
- Cloud service models (IaaS, PaaS, SaaS)
- Cloud deployment models (Public, Private, Hybrid)
- Multi-cloud strategies and benefits
- Shared responsibility model
- Cloud economics basics

### Learning Sequence
1. **Concept Understanding**: Study cloud fundamentals and vocabulary
2. **Vendor Exploration**: Create accounts and explore basic interfaces
3. **Comparison Analysis**: Compare provider interfaces and capabilities
4. **Practical Application**: Deploy a simple resource on each platform
5. **Integration Challenge**: Plan a hypothetical multi-cloud deployment
6. **Assessment**: Complete knowledge validation quiz

### Practical Exercises

#### AWS
- Create an AWS account and explore the console
- Use AWS Pricing Calculator to estimate costs
- Review the AWS Well-Architected Framework

#### GCP
- Create a GCP account and explore the console
- Use GCP Pricing Calculator to estimate costs
- Review the GCP Architecture Framework

#### Azure
- Create an Azure account and explore the portal
- Use Azure Pricing Calculator to estimate costs
- Review the Azure Well-Architected Framework

### Comparison Matrix
| Feature | AWS | GCP | Azure |
|---------|-----|-----|-------|
| Management Console | AWS Management Console | Google Cloud Console | Azure Portal |
| Command Line | AWS CLI | Google Cloud SDK | Azure CLI |
| Infrastructure as Code | CloudFormation | Deployment Manager | ARM Templates |
| Free Tier | 12-month + Always Free | Always Free tier | 12-month + Always Free |

### Certification Alignment
- AWS: AWS Certified Cloud Practitioner
- GCP: Google Cloud Digital Leader
- Azure: Microsoft Certified: Azure Fundamentals (AZ-900)

### Resources
- [AWS Cloud Essentials](https://aws.amazon.com/getting-started/)
- [GCP Cloud Essentials](https://cloud.google.com/docs/get-started)
- [Azure Fundamentals](https://docs.microsoft.com/en-us/learn/paths/azure-fundamentals/)

### Dependencies
- **Prerequisites**: Basic IT knowledge
- **Builds foundation for**: All subsequent phases

### Progress Checkpoint
Answer these questions:
1. Compare IaaS, PaaS, and SaaS with warehouse examples
2. Describe three benefits of a multi-cloud strategy
3. Explain the shared responsibility model for each provider

## Phase 1: Identity & Access Management (Warehouse Security & Access Control)

### Metaphor
Issuing security badges and defining access levels for different areas and personnel.

### Learning Objectives
- Implement identity management across all three clouds
- Configure role-based access control policies
- Enable and manage multi-factor authentication
- Design security permission strategies

### Key Concepts
- Identity providers and federation
- Users, groups, roles, and policies
- Principle of least privilege
- Authentication vs. authorization
- Role-based access control (RBAC)

### Learning Sequence
1. **Concept Understanding**: Study IAM fundamentals and security principles
2. **Vendor Exploration**: Explore each provider's IAM implementation
3. **Comparison Analysis**: Compare policy structures and capabilities
4. **Practical Application**: Create and apply roles and policies
5. **Integration Challenge**: Configure cross-cloud identity federation
6. **Assessment**: Complete IAM security audit exercise

### Vendor Services

#### AWS
- **IAM**: Users, Groups, Roles, Policies
- **AWS Organizations**: Multi-account management
- **AWS Single Sign-On**: Centralized access management

**Practical Exercises**:
- Create users, groups, and custom policies
- Implement MFA and password policies
- Set up cross-account access using roles

#### GCP
- **Cloud Identity**: User and group management
- **IAM**: Roles and permissions
- **Resource Hierarchy**: Organization, folders, projects

**Practical Exercises**:
- Configure custom roles with specific permissions
- Implement service accounts for application access
- Set up organization policies

#### Azure
- **Azure Active Directory**: Identity management
- **RBAC**: Role-based access control
- **Conditional Access**: Context-based security policies

**Practical Exercises**:
- Create custom RBAC roles
- Implement Conditional Access policies
- Configure Azure AD Connect for hybrid identity

### Comparison Matrix
| Feature | AWS | GCP | Azure |
|---------|-----|-----|-------|
| Identity Store | IAM | Cloud Identity | Azure AD |
| Group Management | IAM Groups | Cloud Identity Groups | Azure AD Groups |
| Access Policies | IAM Policies | IAM Roles | RBAC Roles |
| External Identity | Federation/Cognito | Workforce Identity | Azure AD B2B/B2C |

### Certification Alignment
- AWS: Security specialty, Solutions Architect
- GCP: Professional Cloud Security Engineer
- Azure: Security specialty (AZ-500)

### Resources
- [AWS IAM Documentation](https://docs.aws.amazon.com/iam/)
- [GCP IAM Documentation](https://cloud.google.com/iam/docs)
- [Azure RBAC Documentation](https://docs.microsoft.com/en-us/azure/role-based-access-control/)

### Dependencies
- **Prerequisites**: Phase 0
- **Builds foundation for**: All security aspects in later phases

### Progress Checkpoint
1. Create a security policy for a hypothetical application
2. Explain the differences in permissions models between providers
3. Design an identity federation architecture for a global organization

## Phase 2: Storage (Storage Units - Shelves, Cold Storage, Filing Cabinets)

### Metaphor
Different storage areas within the warehouse – accessible shelves (Object), secure vaults (Block), and organized filing systems (File).

### Learning Objectives
- Select appropriate storage services for different use cases
- Configure storage classes for cost optimization
- Implement data lifecycle management
- Design data protection and security measures

### Key Concepts
- Object, block, and file storage
- Storage classes and performance tiers
- Data lifecycle policies
- Access control for storage
- Backup and disaster recovery

### Learning Sequence
1. **Concept Understanding**: Learn storage types and characteristics
2. **Vendor Exploration**: Explore storage offerings from each provider
3. **Comparison Analysis**: Compare features, performance, and pricing
4. **Practical Application**: Deploy and configure each storage type
5. **Integration Challenge**: Build a multi-tier storage solution
6. **Assessment**: Complete storage architecture exercise

### Vendor Services

#### AWS
- **S3**: Object storage
- **EBS**: Block storage
- **EFS**: File storage
- **Glacier**: Archive storage

**Practical Exercises**:
- Create S3 buckets with lifecycle policies
- Configure cross-region replication
- Set up EFS with multiple access points

#### GCP
- **Cloud Storage**: Object storage
- **Persistent Disk**: Block storage
- **Filestore**: File storage
- **Archive Storage**: Long-term retention

**Practical Exercises**:
- Create storage buckets with custom IAM
- Configure object versioning and retention
- Set up Cloud Storage transfer service

#### Azure
- **Blob Storage**: Object storage
- **Disk Storage**: Block storage
- **Files**: File storage
- **Archive Storage**: Cold storage tier

**Practical Exercises**:
- Create storage accounts with access tiers
- Configure Blob versioning and soft delete
- Implement Azure Files with AD authentication

### Comparison Matrix
| Feature | AWS | GCP | Azure |
|---------|-----|-----|-------|
| Object Storage | S3 | Cloud Storage | Blob Storage |
| Block Storage | EBS | Persistent Disk | Managed Disks |
| File Storage | EFS | Filestore | Azure Files |
| Archive Storage | Glacier | Archive Storage | Cool/Archive tiers |

### Certification Alignment
- AWS: Solutions Architect, Storage specialty
- GCP: Professional Cloud Architect
- Azure: AZ-104, AZ-305

### Resources
- [AWS Storage Documentation](https://aws.amazon.com/products/storage/)
- [GCP Storage Documentation](https://cloud.google.com/products/storage)
- [Azure Storage Documentation](https://docs.microsoft.com/en-us/azure/storage/)

### Dependencies
- **Prerequisites**: Phase 0, Phase 1 (for security)
- **Builds foundation for**: Compute, Databases, Big Data

### Progress Checkpoint
1. Design a multi-tier storage architecture for a media company
2. Compare costs for storing 10TB of data across providers
3. Create a disaster recovery plan using storage replication

## Phase 3: Compute (Processing Centers - Assembly Lines, Robots)

### Metaphor
Areas and machinery within the warehouse where goods are processed – manual assembly lines (VMs) and automated robotic arms (Containers).

### Learning Objectives
- Deploy and manage virtual machines
- Implement containerization with Docker
- Orchestrate containers with Kubernetes
- Design scalable compute architectures

### Key Concepts
- Virtual machines and instance types
- Containerization principles
- Kubernetes architecture
- Auto-scaling and load balancing
- High availability designs

### Learning Sequence
1. **Concept Understanding**: Study compute models and virtualization
2. **Vendor Exploration**: Explore VM and container services
3. **Comparison Analysis**: Compare performance, features, and pricing
4. **Practical Application**: Deploy applications using different compute options
5. **Integration Challenge**: Build a hybrid compute architecture
6. **Assessment**: Complete compute solution design exercise

### Vendor Services

#### AWS
- **EC2**: Virtual machines
- **ECS/EKS**: Container orchestration
- **Fargate**: Serverless containers
- **Auto Scaling**: Automatic capacity adjustment

**Practical Exercises**:
- Launch EC2 instances with custom AMIs
- Deploy containerized applications on ECS
- Implement auto-scaling for variable workloads

#### GCP
- **Compute Engine**: Virtual machines
- **GKE**: Kubernetes Engine
- **Cloud Run**: Managed containers
- **Instance Groups**: VM management

**Practical Exercises**:
- Create VM instances with startup scripts
- Deploy a GKE cluster with custom node pools
- Implement managed instance groups with auto-scaling

#### Azure
- **Virtual Machines**: IaaS compute
- **AKS**: Kubernetes Service
- **Container Instances**: Serverless containers
- **Scale Sets**: Auto-scaling VMs

**Practical Exercises**:
- Deploy VMs with custom extensions
- Create an AKS cluster with Azure CNI
- Implement VM Scale Sets with custom scaling rules

### Comparison Matrix
| Feature | AWS | GCP | Azure |
|---------|-----|-----|-------|
| Virtual Machines | EC2 | Compute Engine | Virtual Machines |
| Kubernetes | EKS | GKE | AKS |
| Serverless Containers | Fargate | Cloud Run | Container Instances |
| VM Auto-scaling | Auto Scaling Groups | Instance Groups | Scale Sets |

### Certification Alignment
- AWS: Solutions Architect, SysOps Administrator
- GCP: Professional Cloud Architect
- Azure: AZ-104, AZ-305

### Resources
- [AWS Compute Documentation](https://aws.amazon.com/products/compute/)
- [GCP Compute Documentation](https://cloud.google.com/products/compute)
- [Azure Compute Documentation](https://docs.microsoft.com/en-us/azure/virtual-machines/)

### Dependencies
- **Prerequisites**: Phase 0, Phase 1, Phase 2
- **Builds foundation for**: Serverless, DevOps, Networking

### Progress Checkpoint
1. Design a highly available web application architecture
2. Compare container orchestration approaches across providers
3. Create an auto-scaling strategy for variable workloads

## Phase 4: Databases (Inventory Management Systems)

### Metaphor
Sophisticated systems used to track, manage, and query inventory data stored within the warehouse.

### Learning Objectives
- Select appropriate database types for different use cases
- Deploy and configure managed database services
- Implement database scaling and high availability
- Design backup and recovery strategies

### Key Concepts
- Relational vs. NoSQL databases
- Database performance and scaling
- High availability and read replicas
- Backup, restore, and point-in-time recovery
- Data consistency models

### Learning Sequence
1. **Concept Understanding**: Study database types and characteristics
2. **Vendor Exploration**: Explore database offerings from each provider
3. **Comparison Analysis**: Compare features, performance, and pricing
4. **Practical Application**: Deploy and configure different database types
5. **Integration Challenge**: Build a multi-database solution
6. **Assessment**: Complete database architecture exercise

### Vendor Services

#### AWS
- **RDS**: Relational databases
- **DynamoDB**: NoSQL key-value/document
- **ElastiCache**: In-memory caching
- **Redshift**: Data warehousing

**Practical Exercises**:
- Deploy RDS with read replicas
- Create a DynamoDB table with GSI/LSI
- Implement backup and point-in-time recovery

#### GCP
- **Cloud SQL**: Relational databases
- **Firestore/Bigtable**: NoSQL options
- **Memorystore**: In-memory caching
- **Spanner**: Global distributed relational

**Practical Exercises**:
- Set up Cloud SQL with high availability
- Create Firestore collections with security rules
- Implement Bigtable clusters for high throughput

#### Azure
- **Azure SQL**: Relational databases
- **Cosmos DB**: Multi-model NoSQL
- **Cache for Redis**: In-memory caching
- **Synapse**: Data analytics

**Practical Exercises**:
- Deploy Azure SQL with geo-replication
- Create Cosmos DB with multiple APIs
- Configure automatic failover groups

### Comparison Matrix
| Feature | AWS | GCP | Azure |
|---------|-----|-----|-------|
| Relational DB | RDS | Cloud SQL | Azure SQL |
| NoSQL Document | DynamoDB | Firestore | Cosmos DB |
| In-Memory Cache | ElastiCache | Memorystore | Cache for Redis |
| Data Warehouse | Redshift | BigQuery | Synapse |

### Certification Alignment
- AWS: Database specialty, Solutions Architect
- GCP: Professional Data Engineer
- Azure: Data specialty (DP-300)

### Resources
- [AWS Database Documentation](https://aws.amazon.com/products/databases/)
- [GCP Database Documentation](https://cloud.google.com/products/databases)
- [Azure Database Documentation](https://docs.microsoft.com/en-us/azure/azure-sql/)

### Dependencies
- **Prerequisites**: Phase 0, Phase 1, Phase 2
- **Builds foundation for**: Serverless, Big Data, AI/ML

### Progress Checkpoint
1. Design a database architecture for a global e-commerce application
2. Compare performance characteristics of different database types
3. Create a disaster recovery plan for critical database workloads

## Phase 5: Serverless Architectures (Automated Task Dispatch & Fulfillment)

### Metaphor
Highly automated systems that instantly activate processes only when specific tasks need fulfillment, without dedicated, always-on machinery.

### Learning Objectives
- Implement event-driven architectures
- Deploy serverless functions for various use cases
- Design API gateways for exposing serverless applications
- Create complex workflows using state management

### Key Concepts
- Function-as-a-Service (FaaS)
- Event-driven design patterns
- API management and security
- Serverless limitations and constraints
- State management in serverless applications

### Learning Sequence
1. **Concept Understanding**: Study serverless concepts and patterns
2. **Vendor Exploration**: Explore serverless offerings from each provider
3. **Comparison Analysis**: Compare features, limitations, and pricing
4. **Practical Application**: Deploy serverless applications
5. **Integration Challenge**: Build an end-to-end serverless solution
6. **Assessment**: Complete serverless architecture exercise

### Vendor Services

#### AWS
- **Lambda**: Serverless functions
- **API Gateway**: API management
- **Step Functions**: Workflow orchestration
- **EventBridge**: Event routing
- **SQS/SNS**: Messaging and notifications

**Practical Exercises**:
- Create Lambda functions with different triggers
- Build a REST API with API Gateway
- Implement a state machine with Step Functions

#### GCP
- **Cloud Functions**: Serverless functions
- **Cloud Run**: Container-based serverless
- **API Gateway**: API management
- **Workflows**: Serverless orchestration
- **Pub/Sub**: Messaging service

**Practical Exercises**:
- Deploy Cloud Functions with different triggers
- Create serverless containers with Cloud Run
- Implement event-driven architectures with Pub/Sub

#### Azure
- **Functions**: Serverless compute
- **Logic Apps**: Workflow integration
- **API Management**: API gateway
- **Event Grid**: Event routing
- **Service Bus**: Messaging service

**Practical Exercises**:
- Create Azure Functions with different bindings
- Build automated workflows with Logic Apps
- Implement event processing with Event Grid

### Comparison Matrix
| Feature | AWS | GCP | Azure |
|---------|-----|-----|-------|
| Functions | Lambda | Cloud Functions | Azure Functions |
| API Gateway | API Gateway | API Gateway | API Management |
| Workflow Orchestration | Step Functions | Workflows | Logic Apps |
| Event Routing | EventBridge | Pub/Sub | Event Grid |
| Messaging | SQS/SNS | Pub/Sub | Service Bus |

### Certification Alignment
- AWS: Developer Associate, Solutions Architect
- GCP: Professional Cloud Developer
- Azure: AZ-204, AZ-305

### Resources
- [AWS Serverless Documentation](https://aws.amazon.com/serverless/)
- [GCP Serverless Documentation](https://cloud.google.com/serverless)
- [Azure Serverless Documentation](https://azure.microsoft.com/en-us/overview/serverless-computing/)

### Dependencies
- **Prerequisites**: Phase 0, Phase 1, Phases 2-4 (helpful)
- **Builds foundation for**: DevOps, Monitoring, Integration scenarios

### Progress Checkpoint
1. Design a serverless event processing architecture
2. Compare cold start performance across providers
3. Create a cost analysis for serverless vs. traditional architectures

## Phase 6: Networking (Digital Highway System - Roads, Traffic Lights, Delivery Networks)

### Metaphor
Infrastructure connecting different parts of the warehouse – internal roads (VPCs/VNets), traffic control (Security Groups/Firewalls), and global delivery routes (CDNs).

### Learning Objectives
- Design cloud network architectures
- Implement security at the network level
- Configure global content delivery and DNS
- Establish hybrid connectivity solutions

### Key Concepts
- Virtual Private Clouds/Networks
- Subnets and IP address management
- Network security and firewalls
- Load balancing and traffic management
- Connectivity options (VPN, Direct Connect)

### Learning Sequence
1. **Concept Understanding**: Study cloud networking fundamentals
2. **Vendor Exploration**: Explore networking services from each provider
3. **Comparison Analysis**: Compare features, capabilities, and pricing
4. **Practical Application**: Deploy and configure network resources
5. **Integration Challenge**: Build a multi-region, hybrid network
6. **Assessment**: Complete network architecture exercise

### Vendor Services

#### AWS
- **VPC**: Virtual Private Cloud
- **Route 53**: DNS service
- **CloudFront**: Content Delivery Network
- **Direct Connect**: Dedicated connectivity
- **VPN**: Virtual private network

**Practical Exercises**:
- Create a multi-tier VPC architecture
- Implement security groups and NACLs
- Configure a CloudFront distribution
- Set up site-to-site VPN connection

#### GCP
- **VPC Network**: Virtual Private Cloud
- **Cloud DNS**: Domain name service
- **Cloud CDN**: Content Delivery Network
- **Cloud Interconnect**: Dedicated connectivity
- **Cloud VPN**: Virtual private network

**Practical Exercises**:
- Create shared VPC architectures
- Implement firewall rules and security policies
- Configure global load balancing
- Set up Cloud Interconnect or Partner Interconnect

#### Azure
- **Virtual Network**: VNet
- **Azure DNS**: Domain name service
- **Front Door/CDN**: Content delivery
- **ExpressRoute**: Dedicated connectivity
- **VPN Gateway**: Virtual private network

**Practical Exercises**:
- Design hub-and-spoke network architectures
- Implement NSGs and Azure Firewall
- Configure Application Gateway
- Set up ExpressRoute connectivity

### Comparison Matrix
| Feature | AWS | GCP | Azure |
|---------|-----|-----|-------|
| Virtual Network | VPC | VPC Network | Virtual Network |
| Network Security | Security Groups, NACLs | VPC Firewall Rules | NSGs, Azure Firewall |
| Load Balancing | ELB (ALB/NLB) | Cloud Load Balancing | Azure Load Balancer |
| DNS | Route 53 | Cloud DNS | Azure DNS |
| CDN | CloudFront | Cloud CDN | Azure CDN |
| Dedicated Connect | Direct Connect | Cloud Interconnect | ExpressRoute |

### Certification Alignment
- AWS: Advanced Networking specialty, Solutions Architect
- GCP: Professional Cloud Network Engineer
- Azure: AZ-700, AZ-104

### Resources
- [AWS Networking Documentation](https://docs.aws.amazon.com/vpc/)
- [GCP Networking Documentation](https://cloud.google.com/products/networking)
- [Azure Networking Documentation](https://docs.microsoft.com/en-us/azure/networking/)

### Dependencies
- **Prerequisites**: Phase 0, Phase 1, helpful to know Phase 3
- **Builds foundation for**: Security, Monitoring, DevOps

### Progress Checkpoint
1. Design a secure multi-tier network architecture
2. Compare different hybrid connectivity options
3. Create a global content delivery strategy

## Additional Phases Follow Similar Structure

For phases 7-12, follow the same comprehensive framework including:
- Phase 7: Monitoring & Observability
- Phase 8: DevOps & Automation
- Phase 9: Big Data & Analytics
- Phase 10: AI & Machine Learning
- Phase 11: Security & Compliance
- Phase 12: Multi-Cloud Strategy & Governance

## Appendix A: Certification Roadmap

| Level | AWS | GCP | Azure |
|-------|-----|-----|-------|
| Entry | Cloud Practitioner | Digital Leader | AZ-900 (Fundamentals) |
| Associate | Solutions Architect Associate, Developer Associate, SysOps Administrator | Associate Cloud Engineer | AZ-104 (Administrator) |
| Professional | Solutions Architect Professional, DevOps Professional | Professional Cloud Architect, Professional Cloud Developer | AZ-305 (Solutions Architect) |
| Specialty | Security, Networking, Database, Machine Learning, Data Analytics | Professional Cloud Security Engineer, Professional Data Engineer, Professional DevOps Engineer | AZ-500 (Security), AZ-700 (Networking), DP-300 (Database), AI-102 (AI Engineer) |

## Appendix B: Free Tier Resources Guide

| Provider | Compute | Storage | Database | Other |
|----------|---------|---------|----------|-------|
| AWS | 750 hours of EC2 t2.micro | 5GB S3, 30GB EBS | 750 hours of RDS | Lambda: 1M free requests |
| GCP | 1 e2-micro VM (US regions) | 5GB Cloud Storage | 1 small Cloud SQL instance | Cloud Functions: 2M invocations |
| Azure | 750 hours of B1S VMs | 5GB Blob Storage | 250GB SQL Database | Functions: 1M executions |

## Appendix C: Multi-Cloud Tools

| Category | Tools |
|----------|-------|
| Infrastructure as Code | Terraform, Pulumi, AWS CDK |
| Configuration Management | Ansible, Chef, Puppet |
| CI/CD | GitHub Actions, GitLab CI, Jenkins |
| Kubernetes Management | Rancher, Anthos, Azure Arc |
| Monitoring | Prometheus, Grafana, Datadog |
| Identity Management | Okta, Auth0, Keycloak |
| Cost Management | CloudHealth, Cloudability, Azure Cost Management | 