#!/bin/bash
# Vercel Ignored Build Step
# https://vercel.com/docs/concepts/projects/overview#ignored-build-step
#
# Exit 1 = proceed with build
# Exit 0 = skip build

BRANCH="$VERCEL_GIT_COMMIT_REF"

if [[ "$BRANCH" == "main" || "$BRANCH" == "master" || "$BRANCH" == "develop" ]]; then
  echo "✓ Branch '$BRANCH' — proceeding with build."
  exit 1
else
  echo "✗ Branch '$BRANCH' — skipping build."
  exit 0
fi
