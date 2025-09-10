---
title: "Hic vs HiChIP using CNV-HiChIP Tools - Lab Meeting "
date: 2025-09-10
aliases: 
tags: ["cnv-hichip", "usage"]
author: "Hyunmin Kim"
description: "Usage of CNV HiChIP Tools." 
summary: "Run with toy example."
cover:
    image: "igv_snapshot_mg63_hicvshichip1d.png"
    alt: "Hic vs Hichip"
    relative: true
editPost:
    URL: "https://github.com/hmgene/hm-site"
    Text: "Posts"
showToc: true
disableAnchoredHeadings: false

---
## Introduction

I’m Hyunmin, a bioinformatician from Korea.

<img src="whoami.png" width="250" height="300">

My work focuses on challenging problems such as:

* Profiling dinosaur DNA
* Calculating CNVs from HiChIP
* Resolve Bioinformatics Heterogeneity Amplifying Signals from All-sick 
* Debugging Machine Languages in Perl, R, and Python that are difficult to deploy 



## CNV-HiChIP Tools Outline
```
    cnv prepro     # prepare sequence biases GC, Mappability, Restriction Engymes
    cnv peak       # CNV-aware peak caller 
    cnv calculate  # CNV calculator

```

## Prepare mcool Files
```
    ## input.bam 
    i=input.bam
    o=collated

    mamba activate hm-tools
    samtools collate -@ 8 $i -o $o.bam
    hm bam2pair $o.bam | hm pair2mcool - > $o.mcool 
```

## Make bedGraph Files
```
    i=mg63_hichip_chr8

    ## use 1d density
    bamToBed -i $i.collated.bam | hm bed2bg - 1k | gzip -c > $i.1kden.bedGraph.gz 

    ## use 3d loop 
    hm mcool2bg $i.mcool 1k | gzip -c > $i.1kloop.bedGraph.gz

```

## CNV-aware Peak calling
```
    i=mg63_hichip_chr8
    cnv prepro
    prepro <1kbp.bedGraph> <re=uniform>

    cnv calculate
    calculate <prepro> [cnv_bin=20000] [method=cnv_l2_sum]
      prepro          Preprocessed input file (use cnv prepro) 
      cnv_bin         Bin size for CNV calculation (default: 20000)
      method          CNV modeling method (default: cnv_l2_sum)
          cnv_l2_sum  Aggregated fine model using log2 fold change
          cnv_rd_sum  Aggregated fine model using residuals
          cnv_l2      Coarse model using log2 fold change
          cnv_rd      Coarse model using residuals


    cnv prepro $i.1kden.bedGraph.gz  uniform | cnv calculate - 20k > $i.cnv

    cnv prepro $i.1kden.bedGraph.gz uniform | cnv peak - > $i.peak.bed
    intersectBed -a <( gunzip -dc $1.1kden.bedGraph.gz ) -b  $i.peak.bed  -v |\
            cnv prepro - uniform | cnv calculate - 20k | gzip -c > $n.cnv_nopeak.bedGraph.gz

```

## Comparison Results
### Metric

The coefficient of determination is defined as: \( R^2 = 1 - \frac{SS_\text{res}}{SS_\text{tot}} \)

$$
R^2 = 1 - \frac{\sum_{i=1}^n (y_i - \hat{y}_i)^2}{\sum_{i=1}^n (y_i - \bar{y})^2}
$$

where:
- \(y_i\) = observed values  
- \(\hat{y}_i\) = predicted values  
- \(\bar{y}\) = mean of observed values  

The RMSE (RootMeanSquareError) is defined as :

$$
\text{RMSE} = \sqrt{\frac{1}{n} \sum_{i=1}^{n} (y_i - \hat{y}_i)^2}
$$

### Data
| name | exptype | input | method |
| - | - | - | - |
| input | chip | 1k density | our |
| hichip_1d | hichip | 1k density | our |
| hichip_l | hichip | 1k loop density | our |
| hichip_l_neo | hichip | 1k density | neoloopfinder |
| hic_1d | hic | 1k density | our |
| hic_l | hic | 1k loop density | our |
| hic_l_neo | hic | 1k density | neoloopfinder |


![fig](hic_vs_hichip_mg63_pairplot.png)
    
