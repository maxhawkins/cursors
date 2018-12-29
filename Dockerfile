FROM golang:1.11-alpine AS go

RUN apk add git build-base
RUN go get github.com/jteeuwen/go-bindata/... github.com/elazarl/go-bindata-assetfs/...

WORKDIR /api
COPY . .

RUN go generate -mod=vendor ./...
RUN go install -tags assetfs -mod=vendor -v ./...

FROM alpine

RUN apk add --update ca-certificates tzdata

COPY --from=go /go/bin/cursors /cursors

CMD ["/cursors"]

