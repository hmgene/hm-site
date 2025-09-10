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
    i=mg63_hic_chr8
    ## use 1d density
    bamToBed -i $i.collated.bam | hm bed2bg - 1k | gzip -c > $i.1kden.bedGraph.gz 

    ## use 3d loop 
    hm mcool2bg $i.mcool 1k | gzip -c > $i.1kloop.bedGraph.gz

```

## CNV-aware Peak calling
```
    i=mg63_hichip_chr8
    cnv prepare $i.1kden.bedGraph.gz | cnv peak - > $i.peak
    cnv calculate $i.peak 20k > $i.cnv

    intersectBed -a <( gunzip -dc $n.bedGraph.gz) -b  $n.peak.bed  -v |\
            cnv prepro - $e | cnv cnvl2 - 20k cnv_l2_sum | gzip -c > $n.cnv.bedGraph.gz


```
    
Sunt in culpa qui officia deserunt mollit anim id est laborum.

## Part 1: Review of Romance languages

This section reviews Romance languages. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

##### Lecture videos

+ [Lecture video 1](https://youtu.be/3MZeJED2yns) – This is a first lecture video.
+ [Lecture video 2](https://youtu.be/8ihJsf-AXdA) – This is a another lecture video.
+ [Lecture video 3](https://youtu.be/79MSNfp1rw0) – This is a third lecture video. It is quite short.

##### Lecture notes

+ [Lecture note 1](lecture1.pdf)

##### Readings

+ [Paper 1](https://pascalmichaillat.org/1.pdf) – This is a first paper to read.
+ [Paper 2](https://pascalmichaillat.org/2.pdf) – This paper builds on the first one.
+ [Paper 3](https://pascalmichaillat.org/4.pdf) – This paper is more complex.

## Part 2: Portugese irregular verbs

This section introduces Portugese irregular verbs. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

##### Lecture videos

+ [Lecture video 4](https://youtu.be/IZI0_WwIyb8)
+ [Lecture video 5](https://youtu.be/Qz7CCB1-gu8)
+ [Lecture video 6](https://youtu.be/79MSNfp1rw0)

##### Lecture notes

+ [Lecture note 2](lecture2.pdf)

##### Readings

+ [Paper 4](https://pascalmichaillat.org/5.pdf) – This paper computes things. (Details about the simulations are presented in the paper's [online appendix](https://pascalmichaillat.org/5a.pdf).)
+ [Paper 5](https://pascalmichaillat.org/3.pdf) – This paper proves things. (The paper's [online appendix](https://pascalmichaillat.org/3a.pdf) contains long proofs and extensions of the results.)


## Part 3: Spanish irregular verbs

This section quickly discusses irregular verbs in Spanish. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 

##### Lecture videos

+ [Lecture video 7](https://youtu.be/pIS8-mXG1oY)
+ [Lecture video 8](https://youtu.be/FUaeNM8_fxs)
+ [Optional lecture video](https://youtu.be/xjHVrx7jfdY)

##### Basic readings

+ [Paper 6](https://pascalmichaillat.org/10.pdf)

##### Advanced readings

+ [Paper 7](https://pascalmichaillat.org/11.pdf)
+ [Paper 8](https://pascalmichaillat.org/12.pdf)

## Conclusion

This section concludes by comparing Portuguese and Spanish irregular verbs to irregular verbs in other Romance languages. 

> Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Aenean magna nisl, mollis quis, molestie eu, feugiat in, orci. In hac habitasse platea dictumst. Quisque non felis. Nullam vulputate libero quis ligula. Fusce scelerisque suscipit sapien. Suspendisse commodo ullamcorper magna. 
> Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 

Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

