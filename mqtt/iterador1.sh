#!/bin/bash
pub='mosquitto_pub -d -h localhost -p 1993 -t medicion/consumo -m 0.111'

# PRICE=1.1
# QTY=21
# RES=$(echo "scale=4; $PRICE*$QTY" | bc)
# echo $RES

echo "------0----"
#for (( k = 1; k < 3; ++k )); do
for i in `seq 1 3`;
do       
       #eval $pub
       multiplier=0.1
       randonNumber=$((1 + RANDOM % 10 ))
       result=$(echo "scale=4; $randonNumber*$multiplier" | bc)
       echo $result
     
      # echo $($RANDOM)
done 
echo "------1-----"

for i in `seq 1 3`;
do 
  printf '%s\n' $(echo "scale=8; $RANDOM/32768" | bc )
done 

echo "-----2------"
awk -v n=10 -v seed="$RANDOM" 'BEGIN { srand(seed); for (i=0; i<n; ++i) printf("%.4f\n", rand()) }'

echo "-----3------"
awk -v seed="$RANDOM" 'BEGIN { srand(seed); printf("%.4f\n", rand()) }'

echo "-----4------"
for (( n = 0; n < 3; ++n )); do
    result=`awk -v seed="$RANDOM" 'BEGIN { srand(seed); printf("%.5f\n", rand()) }'`
    echo $result
done 
