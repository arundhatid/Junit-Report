#!/bin/bash
set -e

echo "Connect to the cluster"
gcloud container clusters get-credentials data-discovery --region europe-west4 --project p-cdd-services

echo "Deleting the secret creds and will create a new one"
kubectl delete secret --ignore-not-found -n data-discovery svc-account-credentials-probe

echo "Deploy Helm Charts"
helm upgrade \
--install \
--namespace=data-discovery \
--wait \
--set env.SVCACCOUNTCREDS="$SECRETCREDS" \
--atomic cdd-probe probe-deployment
