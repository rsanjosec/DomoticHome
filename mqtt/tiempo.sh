#!/bin/bash
printf "*****hello\nworld\n****"
timestamp=$(date +%s)
echo '1= ' $timestamp

timestamp=$( date +%T )
echo '2= ' $timestamp

timestamp=$(date +%s%N)
echo '3= ' $timestamp | cut -b1-13

echo '4= ' $timestamp 
# timestampdos = $timestamp | cut -b1-13
echo '-------'
# echo $timestampdos/1000000

echo $(($(date +%s%N)/1000000))