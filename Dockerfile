FROM golang:1.11-alpine AS go

RUN apk add git build-base

WORKDIR /api
COPY . .

RUN go install -tags assetfs -mod=vendor -v ./...

FROM alpine

RUN apk add --update ca-certificates tzdata

COPY --from=go /go/bin/cursors /cursors

CMD ["/cursors"]
