#!/bin/bash

timestamp=$(date +%s)
echo $timestamp

timestamp=$( date +%T )
echo $timestamp

timestamp=$(date +%s%N)
echo $timestamp | cut -b1-13

# timestampdos = $timestamp | cut -b1-13
echo '-------'
# echo $timestampdos/1000000

echo $(($(date +%s%N)/1000000))