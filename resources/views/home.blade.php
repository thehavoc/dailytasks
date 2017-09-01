@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-12">
            <div class="panel panel-default">                
                <div class="panel-body">
                    <h3 class="page-title">Tasks</h3>
                    <UserTasks></UserTasks>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
