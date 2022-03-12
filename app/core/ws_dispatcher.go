package core

type Closer interface{
	Close()
}

type Dispatcher interface {
	Closer
	Run () error
	AddChannel(dashboardId string, channel Channel)
}
